import { cookies } from 'next/headers';

import StatCard from 'components/StatCard';
import { createClient } from 'utils/supabase/server';

export default async function DashboardAlbums() {
  const supabase = createClient(cookies());
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="Total albums" value={value} />;
}
