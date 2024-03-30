import StatCard from '@/app/dashboard/StatCard';
import { BASE_URL } from '@/utils/constants';

export default async function DashboardArtists() {
  const res = await fetch(`${BASE_URL}/api/artists`, {
    next: { revalidate: 60 },
  });
  const { artists } = await res.json();
  const value = artists.length.toLocaleString().toLocaleString();

  return <StatCard title="Artists" value={value} variant="artists" />;
}
