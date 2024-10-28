import { ReactNode } from 'react';

import AppLayout from '@/components/AppLayout';
import { Children } from '@/utils/types';

export const metadata = {
  title: 'Dashboard | Perfect Albums',
};

interface Props extends Children {
  artists: ReactNode;
  cds: ReactNode;
  leaderboard: ReactNode;
  releases: ReactNode;
  songs: ReactNode;
  topAlbums: ReactNode;
  totalAlbums: ReactNode;
  years: ReactNode;
}

export default function DashboardLayout({
  artists,
  cds,
  leaderboard,
  releases,
  songs,
  topAlbums,
  totalAlbums,
  years,
}: Props) {
  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
          {totalAlbums}
          {cds}
          {topAlbums}
          {songs}
          {releases}
          {artists}
        </div>
        <div className="flex-1">{leaderboard}</div>
      </div>
      <div className="mt-4">{years}</div>
    </AppLayout>
  );
}
