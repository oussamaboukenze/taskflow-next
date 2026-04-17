// app/projects/[id]/page.tsx
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

  let project: Project | null = null;
  let errorMessage = '';

  try {
    const res = await fetch(`http://localhost:4000/projects/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      errorMessage =
        res.status === 404
          ? `Aucun projet trouvé avec l'ID « ${id} ».`
          : `Erreur serveur (code ${res.status}).`;
    } else {
      project = await res.json();
    }
  } catch {
    errorMessage = 'Impossible de joindre le serveur. Vérifiez que json-server tourne sur :4000.';
  }

  if (errorMessage || !project) {
    return (
      <div style={{ padding: '2rem', maxWidth: 480, margin: '0 auto' }}>
        <div style={{
          background: '#fff3f3',
          border: '1px solid #f5c6c6',
          borderRadius: 8,
          padding: '1.25rem 1.5rem',
          color: '#b00020',
        }}>
          <strong>Projet introuvable</strong>
          <p style={{ margin: '0.5rem 0 0', fontSize: 14 }}>{errorMessage}</p>
        </div>
        <a href="/dashboard" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#1B8C3E' }}>
          ← Retour au Dashboard
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        <span style={{
          display: 'inline-block', width: 16, height: 16,
          borderRadius: '50%', background: project.color, marginRight: 8,
          verticalAlign: 'middle',
        }} />
        {project.name}
      </h1>
      <p>ID : {project.id}</p>
      <a href="/dashboard">← Retour au Dashboard</a>
    </div>
  );
}