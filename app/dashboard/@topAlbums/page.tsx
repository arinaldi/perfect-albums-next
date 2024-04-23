import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { ROUTE_HREF } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardAlbums() {
  const supabase = createClient();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('favorite', true);
  const value = (count ?? 0).toLocaleString();

  return (
    <Link href={ROUTE_HREF.TOP_ALBUMS}>
      <StatCard title="Top albums" value={value} variant="topAlbums" />
    </Link>
  );
}
