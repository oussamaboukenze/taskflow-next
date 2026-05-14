import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import './globals.css';
import LogoutButton from './components/LogoutButton';

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

interface Session {
  email: string;
  name: string;
  role: string;
}

function parseSession(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as Session;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = parseSession(cookieStore.get('session')?.value);

  return (
    <html lang="fr">
      <body>
        <header
          style={{
            background: '#1B8C3E',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontWeight: 700 }}>TaskFlow</h2>
          </Link>
          <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {user && (
              <Link href="/dashboard" style={{ color: 'white' }}>
                Dashboard
              </Link>
            )}
            {user ? (
              <>
                <span>{user.name}</span>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" style={{ color: 'white' }}>
                Login
              </Link>
            )}
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
