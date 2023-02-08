import 'server-only';

import { BASE_URL } from 'utils/constants';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Perfect Albums | Artists',
};

async function getArtists(): Promise<Payload> {
  const res = await fetch(`${BASE_URL}/api/artists`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function ArtistsPage() {
  const { artists } = await getArtists();

  return (
    <ul className="list-disc p-4 dark:text-white">
      {artists.map((artist) => (
        <li key={artist}>{artist}</li>
      ))}
    </ul>
  );
}
