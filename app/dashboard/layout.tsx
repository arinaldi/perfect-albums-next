import { ReactNode } from 'react';
import { Metadata } from 'next';

import AppLayout from '@/components/AppLayout';
import { Children } from '@/utils/types';

export const metadata: Metadata = {
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
  version: ReactNode;
}

export default function DashboardLayout({
  artists,
  cds,
  leaderboard,
  releases,
  songs,
  topAlbums,
  totalAlbums,
  version,
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
          {version}
        </div>
        <div className="flex-1">{leaderboard}</div>
      </div>
    </AppLayout>
  );
}
