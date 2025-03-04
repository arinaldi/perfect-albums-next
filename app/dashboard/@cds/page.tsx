import StatCard from '@/app/dashboard/StatCard';
import { supabase } from '@/utils/supabase/general';

export default async function DashboardCDs() {
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="CDs" value={value} variant="cds" />;
}
