import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';
import LogoutButton from './components/LogoutButton';
import { getSession } from './lib/session';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'Gestion de projets collaboratifs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();

  return (
    <html lang="fr">
      <body className={inter.className}>
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
