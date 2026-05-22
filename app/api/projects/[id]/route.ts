import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(request: Request, context: ProjectRouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as ProjectBody;
  const name =
    typeof body.name === 'string'
      ? body.name.trim()
      : typeof body.newName === 'string'
        ? body.newName.trim()
        : '';
  const color = typeof body.color === 'string' ? body.color : undefined;

  if (!name) {
    return NextResponse.json({ error: 'Nom requis' }, { status: 400 });
  }

  try {
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        name,
        ...(color ? { color } : {}),
      },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: ProjectRouteContext) {
  const { id } = await context.params;
  try {
    const project = await prisma.project.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: 'Projet introuvable' }, { status: 404 });
  }
}
