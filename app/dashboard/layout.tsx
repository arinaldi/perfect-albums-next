import { ReactNode } from 'react';

import AppLayout from 'components/AppLayout';
import { Children } from 'utils/types';

export const metadata = {
  title: 'Dashboard | Perfect albums',
};

interface Props extends Children {
  cds: ReactNode;
  releases: ReactNode;
  songs: ReactNode;
  topAlbums: ReactNode;
  totalAlbums: ReactNode;
}

export default function DashboardLayout({
  cds,
  releases,
  songs,
  topAlbums,
  totalAlbums,
}: Props) {
  return (
    <AppLayout title="Dashboard">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {topAlbums}
        {songs}
        {releases}
        {totalAlbums}
        {cds}
      </dl>
    </AppLayout>
  );
}
