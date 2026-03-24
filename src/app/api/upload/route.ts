import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const timestamp = Date.now();
        const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
        const uploadDir = join(process.cwd(), 'public', 'uploads');

        // Ensure directory exists
        await mkdir(uploadDir, { recursive: true });

        const path = join(uploadDir, fileName);
        await writeFile(path, buffer);

        const publicUrl = `/uploads/${fileName}`;

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
    }
}
