import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireSession } from '../../lib/session';

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();

  return projects.map((project) => ({ id: String(project.id) }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  await requireSession();
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if (!project) {
    notFound();
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: project.color,
            marginRight: 8,
            verticalAlign: 'middle',
          }}
        />
        {project.name}
      </h1>
      <p>Cree le : {project.createdAt.toLocaleDateString('fr-FR')}</p>
      <Link href="/dashboard">Retour au Dashboard</Link>
    </div>
  );
}
