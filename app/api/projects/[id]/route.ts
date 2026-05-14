import { NextResponse } from 'next/server';
import { readDB, writeDB } from '../db';

interface ProjectBody {
  name?: string;
  newName?: string;
  color?: string;
}

interface ProjectRouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: ProjectRouteContext) {
  const { id } = await context.params;
  const db = readDB();
  const project = db.projects.find((item) => item.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, context: ProjectRouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as ProjectBody;
  const db = readDB();
  const index = db.projects.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  const name =
    typeof body.name === 'string'
      ? body.name.trim()
      : typeof body.newName === 'string'
        ? body.newName.trim()
        : db.projects[index].name;
  const color =
    typeof body.color === 'string' ? body.color : db.projects[index].color;

  if (!name) {
    return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
  }

  db.projects[index] = {
    ...db.projects[index],
    name,
    color,
  };

  writeDB(db);

  return NextResponse.json(db.projects[index]);
}

export async function DELETE(_request: Request, context: ProjectRouteContext) {
  const { id } = await context.params;
  const db = readDB();
  const project = db.projects.find((item) => item.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  db.projects = db.projects.filter((item) => item.id !== id);
  writeDB(db);

  return NextResponse.json(project);
}
