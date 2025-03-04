import 'server-only';
import invariant from 'tiny-invariant';

import { formatSongs } from '@/utils';
import { createClient } from '@/utils/supabase/general';
import FeaturedSongs from './FeaturedSongs';

export const metadata = {
  title: 'Featured songs | Perfect Albums',
};

export default async function FeaturedSongsPage() {
  const supabase = createClient();
  const { data } = await supabase.from('songs').select('*').order('artist');

  invariant(data);

  return <FeaturedSongs count={data.length} data={formatSongs(data)} />;
}
