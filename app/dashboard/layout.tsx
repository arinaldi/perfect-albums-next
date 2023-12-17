import { ReactNode } from 'react';

import AppLayout from 'components/AppLayout';
import { Children } from 'utils/types';

export const metadata = {
  title: 'Dashboard | Perfect albums',
};

interface Props extends Children {
  cds: ReactNode;
  leaderboard: ReactNode;
  releases: ReactNode;
  songs: ReactNode;
  topAlbums: ReactNode;
  totalAlbums: ReactNode;
}

export default function DashboardLayout({
  cds,
  leaderboard,
  releases,
  songs,
  topAlbums,
  totalAlbums,
}: Props) {
  return (
    <AppLayout title="Dashboard">
      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {songs}
        {releases}
        {totalAlbums}
        {topAlbums}
        {cds}
      </dl>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {leaderboard}
      </div>
    </AppLayout>
  );
}
