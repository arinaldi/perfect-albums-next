import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { ROUTE_HREF } from '@/utils/constants';
import { supabase } from '@/utils/supabase/general';

export default async function DashboardReleases() {
  const { count } = await supabase
    .from('releases')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return (
    <Link href={ROUTE_HREF.NEW_RELEASES}>
      <StatCard title="New releases" value={value} variant="releases" />
    </Link>
  );
}
