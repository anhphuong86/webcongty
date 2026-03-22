import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

// Helper to read posts
const readPosts = () => {
    try {
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
};

// Helper to write posts
const writePosts = (posts: any) => {
    fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
};

export async function GET() {
    const posts = readPosts();
    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const newPost = await request.json();
    const posts = readPosts();

    // Auto-increment ID
    const maxId = posts.reduce((max: number, p: any) => Math.max(max, Number(p.id)), 0);
    newPost.id = maxId + 1;
    newPost.date = new Date().toLocaleDateString('vi-VN');

    posts.unshift(newPost); // Add at the beginning
    writePosts(posts);

    return NextResponse.json({ success: true, post: newPost });
}

export async function PUT(request: Request) {
    const updatedPost = await request.json();
    const posts = readPosts();

    const index = posts.findIndex((p: any) => Number(p.id) === Number(updatedPost.id));
    if (index !== -1) {
        posts[index] = { ...posts[index], ...updatedPost };
        writePosts(posts);
        return NextResponse.json({ success: true, post: posts[index] });
    }

    return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    let posts = readPosts();
    const initialLength = posts.length;
    posts = posts.filter((p: any) => Number(p.id) !== Number(id));

    if (posts.length < initialLength) {
        writePosts(posts);
        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
}
