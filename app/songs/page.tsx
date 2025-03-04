import 'server-only';
import invariant from 'tiny-invariant';

import { formatSongs } from '@/utils';
import { supabase } from '@/utils/supabase/general';
import FeaturedSongs from './FeaturedSongs';

export const metadata = {
  title: 'Featured songs | Perfect Albums',
};

async function getSongs() {
  'use cache';
  const { data } = await supabase.from('songs').select('*').order('artist');

  return data;
}

export default async function FeaturedSongsPage() {
  const data = await getSongs();

  invariant(data);

  return <FeaturedSongs count={data.length} data={formatSongs(data)} />;
}
