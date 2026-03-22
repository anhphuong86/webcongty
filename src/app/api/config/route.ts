import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const configFilePath = path.join(process.cwd(), 'src', 'data', 'config.json');

export async function GET() {
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
        const newConfig = await req.json();
        fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2), 'utf8');
        return NextResponse.json({ message: 'Config updated successfully', config: newConfig });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
    }
}
