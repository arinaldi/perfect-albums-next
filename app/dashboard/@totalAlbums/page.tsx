import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { ROUTES_ADMIN } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/user';

export default async function DashboardAlbums() {
  const user = await getUser();
  const supabase = await createClient();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true });
  const value = (count ?? 0).toLocaleString();

  if (user) {
    return (
      <Link href={ROUTES_ADMIN.base.href}>
        <StatCard title="Total albums" value={value} variant="totalAlbums" />
      </Link>
    );
  }

  return <StatCard title="Total albums" value={value} variant="totalAlbums" />;
}
