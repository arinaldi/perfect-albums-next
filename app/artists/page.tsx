import 'server-only';

import { BASE_URL } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import Artists from './Artists';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Artists | Perfect Albums',
};

async function getArtists(): Promise<Payload> {
  const res = await fetch(`${BASE_URL}/api/artists`);
  return res.json();
}

export default async function ArtistsPage() {
  const supabase = await createClient();
  const { artists } = await getArtists();

  return <Artists artists={artists} />;
}
