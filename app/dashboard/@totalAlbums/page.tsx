import StatCard from '@/app/dashboard/StatCard';
import { supabase } from '@/utils/supabase/general';

export default async function DashboardAlbums() {
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="Total albums" value={value} variant="totalAlbums" />;
}
