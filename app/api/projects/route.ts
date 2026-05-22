import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ProjectBody {
  name?: string;
  color?: string;
}

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = (await request.json()) as ProjectBody;
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const color = typeof body.color === 'string' ? body.color : '#3498db';

  if (!name) {
    return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
  }

  const newProject = await prisma.project.create({
    data: { name, color },
  });

  return NextResponse.json(newProject, { status: 201 });
}
