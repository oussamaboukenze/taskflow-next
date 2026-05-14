import Link from 'next/link';
import { getBaseUrl } from '../../lib/url';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
        <div
          style={{
            background: '#fff3f3',
            border: '1px solid #f5c6c6',
            borderRadius: 8,
            padding: '1.25rem 1.5rem',
            color: '#b00020',
          }}
        >
          <strong>Projet introuvable</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: 14 }}>
            Aucun projet trouve avec l&apos;ID {id}.
          </p>
        </div>
        <Link
          href="/dashboard"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            color: '#1B8C3E',
          }}
        >
          Retour au Dashboard
        </Link>
      </div>
    );
  }

  const project = (await res.json()) as Project;

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
      <p>ID : {project.id}</p>
      <Link href="/dashboard">Retour au Dashboard</Link>
    </div>
  );
}
