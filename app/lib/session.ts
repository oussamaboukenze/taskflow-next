import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type Session = {
  email: string;
  name: string;
  role: string;
};

export function parseSession(value: string | undefined | null) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as Session;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  return parseSession(cookieStore.get('session')?.value ?? null);
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}
