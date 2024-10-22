import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { ROUTES_ADMIN } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardCDs() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { count } = await supabase
    .from('albums')
    .select('*', { count: 'exact', head: true })
    .eq('cd', true);
  const value = (count ?? 0).toLocaleString();

  if (user) {
    return (
      <Link href={ROUTES_ADMIN.base.href}>
        <StatCard title="CDs" value={value} variant="cds" />
      </Link>
    );
  }

  return <StatCard title="CDs" value={value} variant="cds" />;
}
