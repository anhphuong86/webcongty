import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
        return NextResponse.json([]);
    }

    try {
        const files = fs.readdirSync(uploadDir);
        const mediaFiles = files.filter(file =>
            ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(path.extname(file).toLowerCase())
        ).map(file => ({
            name: file,
            url: `/uploads/${file}`,
            size: fs.statSync(path.join(uploadDir, file)).size,
            mtime: fs.statSync(path.join(uploadDir, file)).mtime
        }));

        // Sort by newest first
        mediaFiles.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        return NextResponse.json(mediaFiles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to list media' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { name } = await request.json();
        const filePath = path.join(process.cwd(), 'public', 'uploads', name);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
    }
}
