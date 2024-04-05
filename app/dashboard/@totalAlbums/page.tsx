import StatCard from '@/app/dashboard/StatCard';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardAlbums() {
  const supabase = createClient();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="Total albums" value={value} variant="totalAlbums" />;
}
