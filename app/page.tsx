import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenue sur TaskFlow</h1>
      <p>Gestion de projets collaboratifs</p>
      <Link href="/login">Se connecter</Link>
    </div>
  );
}
