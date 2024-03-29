import { cookies } from 'next/headers';

import StatCard from '@/app/dashboard/StatCard';
import { createClient } from '@/utils/supabase/server';
import { getArtists } from '@/app/artists/page';

export default async function DashboardArtists() {
  const { artists } = await getArtists();
  // const supabase = createClient(cookies());
  // const { count } = await supabase
  //   .from('songs')
  //   .select('*', { count: 'exact', head: true });
  const value = artists.length.toLocaleString().toLocaleString();

  return <StatCard title="Artists" value={value} variant="artists" />;
}
