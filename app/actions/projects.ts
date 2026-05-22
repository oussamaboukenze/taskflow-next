'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function addProject(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const color = String(formData.get('color') ?? '#3498db');

  if (!name) {
    return;
  }

  await prisma.project.create({ data: { name, color } });

  revalidatePath('/dashboard');
}

export async function renameProject(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const newName = String(formData.get('newName') ?? '').trim();

  if (!id || !newName) {
    return;
  }

  await prisma.project.update({
    where: { id: Number(id) },
    data: { name: newName },
  });

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get('id') ?? '');

  if (!id) {
    return;
  }

  await prisma.project.delete({
    where: { id: Number(id) },
  });

  revalidatePath('/dashboard');
  revalidatePath(`/projects/${id}`);
}
