import { headers } from 'next/headers';

export async function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.replace(/\/$/, '');
  }

  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  return host ? `${protocol}://${host}` : 'http://localhost:3000';
}
