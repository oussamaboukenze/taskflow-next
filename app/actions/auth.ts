'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type LoginState = {
  error?: string;
} | null;

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  if (email !== 'admin@taskflow.com' || password !== 'password123') {
    return { error: 'Email ou mot de passe incorrect' };
  }

  const cookieStore = await cookies();

  cookieStore.set(
    'session',
    JSON.stringify({
      email,
      name: 'Admin',
      role: 'admin',
    }),
    {
      httpOnly: true,
      secure: false,
      maxAge: 3600,
      path: '/',
    }
  );

  redirect('/dashboard');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/login');
}
