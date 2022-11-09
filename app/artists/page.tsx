interface Payload {
  artists: string[];
  success: boolean;
}

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3006'
    : 'https://perfect-albums.vercel.app';

async function getArtists(): Promise<Payload> {
  const res = await fetch(`${BASE_URL}/api/artists`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function ArtistsPage() {
  const { artists } = await getArtists();

  return (
    <ul className="list-disc">
      {artists.map((artist) => (
        <li key={artist}>{artist}</li>
      ))}
    </ul>
  );
}
