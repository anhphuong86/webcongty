import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

const postsFilePath = path.join(process.cwd(), 'src', 'data', 'posts.json');

const readLocalPosts = () => {
    try {
        if (!fs.existsSync(postsFilePath)) return [];
        const fileContent = fs.readFileSync(postsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) { return []; }
};

const writeLocalPosts = (posts: any) => {
    try { fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8'); } catch (e) { }
};

export async function GET() {
    try {
        const db = await dbConnect();
        if (db) {
            const dbPosts = await Post.find({}).sort({ id: -1 }); // Descending
            if (dbPosts && dbPosts.length > 0) {
                return NextResponse.json(dbPosts);
            } else {
                // Seed MongoDB from local JSON on first DB connection
                const localPosts = readLocalPosts();
                if (localPosts.length > 0) {
                    console.log("Seeding MongoDB with local posts data...");
                    await Post.insertMany(localPosts);
                }
                return NextResponse.json(localPosts);
            }
        }
    } catch (e) {
        console.warn("MongoDB GET Posts Failed, falling back to local JSON");
    }

    return NextResponse.json(readLocalPosts());
}

export async function POST(request: Request) {
    try {
        const newPost = await request.json();

        // Local logic
        let localPosts = readLocalPosts();
        const maxId = localPosts.reduce((max: number, p: any) => Math.max(max, Number(p.id) || 0), 0);
        newPost.id = maxId + 1;
        newPost.date = new Date().toLocaleDateString('vi-VN');

        localPosts.unshift(newPost);
        writeLocalPosts(localPosts);

        // Try syncing to MongoDB
        try {
            const db = await dbConnect();
            if (db) {
                await Post.create(newPost);
            }
        } catch (e) { console.error("MongoDB Post Sync Error", e); }

        return NextResponse.json({ success: true, post: newPost });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create post' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedPost = await request.json();

        // Local logic
        let localPosts = readLocalPosts();
        const index = localPosts.findIndex((p: any) => Number(p.id) === Number(updatedPost.id));
        if (index !== -1) {
            localPosts[index] = { ...localPosts[index], ...updatedPost };
            writeLocalPosts(localPosts);
        }

        // DB Logic
        try {
            const db = await dbConnect();
            if (db) {
                await Post.findOneAndUpdate({ id: updatedPost.id }, updatedPost, { upsert: true });
            }
        } catch (e) { console.error("MongoDB Put Sync Error", e); }

        return NextResponse.json({ success: true, post: updatedPost });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

        // Local logic
        let localPosts = readLocalPosts();
        localPosts = localPosts.filter((p: any) => Number(p.id) !== Number(id));
        writeLocalPosts(localPosts);

        // DB Logic
        try {
            const db = await dbConnect();
            if (db) {
                await Post.findOneAndDelete({ id: Number(id) });
            }
        } catch (e) { console.error("MongoDB Delete Sync Error", e); }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
