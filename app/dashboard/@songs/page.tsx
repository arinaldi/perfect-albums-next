import { cookies } from 'next/headers';

import StatCard from '@/app/dashboard/StatCard';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardSongs() {
  const supabase = createClient(cookies());
  const { count } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="Featured songs" value={value} variant="songs" />;
}
