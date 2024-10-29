import StatCard from '@/app/dashboard/StatCard';

export default async function DashboardVersion() {
  return (
    <StatCard
      title="Version"
      value={process.env.NEXT_PUBLIC_APP_VERSION!}
      variant="version"
    />
  );
}
