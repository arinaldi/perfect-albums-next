import StatCard from '@/app/dashboard/StatCard';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardCDs() {
  const supabase = createClient();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="CDs" value={value} variant="cds" />;
}
