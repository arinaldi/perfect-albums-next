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
}

export default function DashboardLayout({
  artists,
  cds,
  leaderboard,
  releases,
  songs,
  topAlbums,
  totalAlbums,
}: Props) {
  return (
    <AppLayout title="Dashboard">
      <div className="flex flex-col gap-4 md:gap-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {totalAlbums}
          {cds}
          {topAlbums}
          {songs}
          {releases}
          {artists}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {leaderboard}
        </div>
      </div>
    </AppLayout>
  );
}
