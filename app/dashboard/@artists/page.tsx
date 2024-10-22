import Link from 'next/link';

import StatCard from '@/app/dashboard/StatCard';
import { BASE_URL, ROUTE_HREF } from '@/utils/constants';

export default async function DashboardArtists() {
  const res = await fetch(`${BASE_URL}/api/artists`);
  const { artists } = await res.json();
  const value = artists.length.toLocaleString().toLocaleString();

  return (
    <Link href={ROUTE_HREF.ARTISTS}>
      <StatCard title="Artists" value={value} variant="artists" />
    </Link>
  );
}
