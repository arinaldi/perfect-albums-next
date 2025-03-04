import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { ROUTE_HREF } from '@/utils/constants';
import { supabase } from '@/utils/supabase/general';

export default async function DashboardSongs() {
  const { count } = await supabase
    .from('songs')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  return (
    <Link href={ROUTE_HREF.FEATURED_SONGS}>
      <StatCard title="Featured songs" value={value} variant="songs" />
    </Link>
  );
}
