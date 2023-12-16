import 'server-only';

import { BASE_URL } from 'utils/constants';
import Random from 'app/artists/Random';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Artists | Perfect albums',
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
    <div className="flex flex-col gap-2 sm:flex-row">
      <ul className="order-2 flex-1 list-disc p-4 dark:text-white sm:order-1">
        {artists.map((artist) => (
          <li key={artist}>{artist}</li>
        ))}
      </ul>
      <div className="order-1 flex-1 sm:order-2">
        <Random artists={artists} />
      </div>
    </div>
  );
}
