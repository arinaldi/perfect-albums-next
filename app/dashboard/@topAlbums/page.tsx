import StatCard from '@/app/dashboard/StatCard';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardAlbums() {
  const supabase = createClient();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('favorite', true);
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="Top albums" value={value} variant="topAlbums" />;
}
