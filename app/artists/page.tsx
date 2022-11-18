import 'server-only';

import { BASE_URL } from 'utils/constants';

interface Payload {
  artists: string[];
  success: boolean;
}

async function getArtists(): Promise<Payload> {
  const res = await fetch(`${BASE_URL}/api/artists`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function ArtistsPage() {
  const { artists } = await getArtists();

  return (
    <ul className="list-disc dark:text-white">
      {artists.map((artist) => (
        <li key={artist}>{artist}</li>
      ))}
    </ul>
  );
}
