import { cookies } from 'next/headers';

import StatCard from 'components/StatCard';
import { createClient } from 'utils/supabase/server';

export default async function DashboardReleases() {
  const supabase = createClient(cookies());
  const { count } = await supabase
    .from('releases')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return <StatCard title="New releases" value={value} />;
}
