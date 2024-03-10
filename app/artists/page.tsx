import 'server-only';

import { BASE_URL } from 'utils/constants';
import Random from 'app/artists/Random';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Artists | Perfect Albums',
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
      <ul className="order-2 ml-6 flex-1 list-disc p-1 sm:order-1">
        {artists.map((artist) => (
          <li key={artist} className="mt-0.5">
            {artist}
          </li>
        ))}
      </ul>
      <div className="order-1 flex-1 sm:order-2">
        <Random artists={artists} />
      </div>
    </div>
  );
}
