import 'server-only';

import { BASE_URL } from '@/utils/constants';
import Artists from './Artists';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Artists | Perfect Albums',
};

async function getArtists(): Promise<Payload> {
  'use cache';
  const res = await fetch(`${BASE_URL}/api/artists`);
  const data = await res.json();

  return data;
}

export default async function ArtistsPage() {
  const { artists } = await getArtists();

  return <Artists artists={artists} />;
}
