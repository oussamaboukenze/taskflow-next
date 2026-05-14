'use server';

import { revalidatePath } from 'next/cache';
import { getBaseUrl } from '../lib/url';

interface Project {
  id: string;
  name: string;
  color: string;
}

async function getProject(id: string) {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/projects/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Project;
}

export async function addProject(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const color = String(formData.get('color') ?? '#3498db');

  if (!name) {
    return;
  }

  const baseUrl = await getBaseUrl();

  await fetch(`${baseUrl}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, color }),
  });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const newName = String(formData.get('newName') ?? '').trim();

  if (!id || !newName) {
    return;
  }

  const project = await getProject(id);

  if (!project) {
    return;
  }

  const baseUrl = await getBaseUrl();

  await fetch(`${baseUrl}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, color: project.color }),
  });

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get('id') ?? '');

  if (!id) {
    return;
  }

  const baseUrl = await getBaseUrl();

  await fetch(`${baseUrl}/api/projects/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}
