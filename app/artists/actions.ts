'use server';

export async function getAccessToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
  });
  const data = await res.json();

  return data?.access_token ?? null;
}

export async function getArtistId(
  token: string,
  artist: string,
): Promise<string | null> {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(artist)}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  const artistId = data?.artists?.items[0]?.id ?? null;

  return artistId;
}

interface SpotifyItem {
  album_type: string;
  total_tracks: number;
  external_urls: {
    spotify: string;
  };
  id: string;
  name: string;
  release_date: string;
}

interface SpotifyAlbums {
  href: string;
  total: number;
  items: SpotifyItem[];
}

export interface Result {
  date: string;
  href: string;
  id: string;
  name: string;
  type: string;
}

export async function getArtistAlbums(
  token: string,
  artistId: string,
): Promise<Result[]> {
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&include_groups=album%2Csingle`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data: SpotifyAlbums = await res.json();

  return (
    data?.items?.map((item) => ({
      date: item.release_date,
      href: item.external_urls.spotify,
      id: item.id,
      name: item.name,
      type: item.album_type,
    })) ?? []
  );
}
