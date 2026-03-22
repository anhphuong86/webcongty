import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import Config from '@/models/Config';

const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');

export async function GET() {
    try {
        const db = await dbConnect();
        if (db) {
            const dbConfig = await Config.findOne({ key: 'global_config' });
            if (dbConfig && dbConfig.data) {
                return NextResponse.json(dbConfig.data);
            } else {
                // Seed MongoDB from local JSON on first DB connection
                if (fs.existsSync(configFilePath)) {
                    console.log("Seeding MongoDB with local config.json data...");
                    const fileContent = fs.readFileSync(configFilePath, 'utf8');
                    const config = JSON.parse(fileContent);
                    await Config.create({ key: 'global_config', data: config });
                    return NextResponse.json(config);
                }
            }
        }
    } catch (e) {
        console.warn("DB Get Config Failed, falling back to local JSON", e);
    }

    // Fallback to local JSON
    try {
        if (!fs.existsSync(configFilePath)) {
            return NextResponse.json({ error: 'Config file not found' }, { status: 404 });
        }
        const fileContent = fs.readFileSync(configFilePath, 'utf8');
        const config = JSON.parse(fileContent);
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        // 1. Save to local JSON first (keep it in sync local backup)
        try {
            fs.writeFileSync(configFilePath, JSON.stringify(data, null, 2), 'utf8');
        } catch (e) { console.error("Write local config failed", e); }

        // 2. Try saving to MongoDB if configured
        try {
            const db = await dbConnect();
            if (db) {
                await Config.findOneAndUpdate(
                    { key: 'global_config' },
                    { data: data },
                    { upsert: true, new: true }
                );
            }
        } catch (dbErr) {
            console.error("MongoDB Config Save Error:", dbErr);
        }

        return NextResponse.json({ message: 'Config updated successfully', config: data });
    } catch (error) {
        console.error('Error in config POST API:', error);
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
