import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

const readLocalProjects = () => {
    try {
        if (!fs.existsSync(projectsFilePath)) return [];
        const fileContent = fs.readFileSync(projectsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) { return []; }
};

const writeLocalProjects = (projects: any) => {
    try { fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8'); } catch (e) { }
};

export async function GET() {
    return NextResponse.json(readLocalProjects());
}

export async function POST(request: Request) {
    try {
        const newProject = await request.json();
        let localProjects = readLocalProjects();

        // Simple ID generation for projects
        const id = 's' + (localProjects.length + 1);
        const projectWithId = { ...newProject, id };

        localProjects.unshift(projectWithId);
        writeLocalProjects(localProjects);

        return NextResponse.json({ success: true, project: projectWithId });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedProject = await request.json();
        let localProjects = readLocalProjects();
        const index = localProjects.findIndex((p: any) => p.id === updatedProject.id);

        if (index !== -1) {
            localProjects[index] = { ...localProjects[index], ...updatedProject };
            writeLocalProjects(localProjects);
        }

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false }, { status: 400 });

        let localProjects = readLocalProjects();
        localProjects = localProjects.filter((p: any) => p.id !== id);
        writeLocalProjects(localProjects);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
