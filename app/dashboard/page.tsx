import Link from 'next/link';
import { deleteProject, renameProject } from '../actions/projects';
import { getBaseUrl } from '../lib/url';
import AddProjectForm from './AddProjectForm';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: 'no-store',
  });
  const projects = (await res.json()) as Project[];

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <AddProjectForm />
      <p>{projects.length} projets</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {projects.map((project) => (
          <li
            key={project.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: project.color,
                display: 'inline-block',
              }}
            />
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
            <form
              action={renameProject}
              style={{ display: 'flex', gap: 8, alignItems: 'center' }}
            >
              <input type="hidden" name="id" value={project.id} />
              <input
                name="newName"
                defaultValue={project.name}
                required
                style={{
                  padding: 6,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '6px 10px',
                  border: '1px solid #1B8C3E',
                  color: '#1B8C3E',
                  background: 'white',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Renommer
              </button>
            </form>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <button
                type="submit"
                style={{
                  padding: '6px 10px',
                  border: '1px solid #b00020',
                  color: '#b00020',
                  background: 'white',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              >
                Supprimer
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
