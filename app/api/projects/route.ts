import { NextResponse } from 'next/server';
import { readDB, writeDB } from './db';

interface ProjectBody {
  name?: string;
  color?: string;
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db.projects);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ProjectBody;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const color = typeof body.color === 'string' ? body.color : '#3498db';

  if (!name) {
    return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
  }

  const db = readDB();
  const newProject = {
    id: String(Date.now()),
    name,
    color,
  };

  db.projects.push(newProject);
  writeDB(db);

  return NextResponse.json(newProject, { status: 201 });
}
