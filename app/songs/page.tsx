import 'server-only';
import { unstable_cache as cache } from 'next/cache';
import invariant from 'tiny-invariant';

import { formatSongs } from '@/utils';
import { createClient, type SupabaseClient } from '@/utils/supabase/server';
import FeaturedSongs from './FeaturedSongs';

export const metadata = {
  title: 'Featured songs | Perfect Albums',
};

const getSongs = cache(
  async (supabase: SupabaseClient) => {
    const { data } = await supabase.from('songs').select('*').order('artist');

    return data;
  },
  ['songs'],
  {
    revalidate: 3600,
    tags: ['songs'],
  },
);

export default async function FeaturedSongsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const data = await getSongs(supabase);

  invariant(data);

  return (
    <FeaturedSongs count={data.length} data={formatSongs(data)} user={user} />
  );
}
