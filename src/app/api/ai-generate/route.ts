import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { topic, keywords, language = 'Vietnamese' } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
        }

        // Initialize Gemini AI
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'GEMINI_API_KEY is not configured in environment variables' }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
Bạn là một chuyên gia content marketing giàu kinh nghiệm trong lĩnh vực Xây dựng dân dụng, Công nghiệp và Cơ điện (MEP). 
Nhiệm vụ của bạn là viết một bài tin tức hoặc bài PR chuyên nghiệp cho website công ty "Xây Lắp Chợ Lớn".

Chủ đề bài viết: ${topic}
Từ khóa (nếu có): ${keywords || 'Không có'}
Ngôn ngữ: ${language}

Yêu cầu định dạng JSON CHÍNH XÁC:
{
  "title": "[Tiêu đề bài viết hấp dẫn, tối đa 15 từ, tối ưu SEO]",
  "excerpt": "[Đoạn tóm tắt thu hút, tối đa 3-4 câu, thôi thúc người đọc]",
  "content": "[Nội dung chi tiết bài viết. Viết thành các đoạn văn rõ ràng. Bắt buộc dài ít nhất 400-500 từ. Chia thành các luận điểm. Sử dụng phong cách viết mạch lạc, đáng tin cậy và chuyên nghiệp.]"
}

Hãy trả về ĐÚNG định dạng JSON ở trên, không chứa mã markdown bao quoanh \`\`\`json.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean up markdown markers if AI included them
        if (text.startsWith('\`\`\`json')) {
            text = text.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
        } else if (text.startsWith('\`\`\`')) {
            text = text.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
        }

        const parsedContent = JSON.parse(text);

        return NextResponse.json(parsedContent, { status: 200 });
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
    }
}
