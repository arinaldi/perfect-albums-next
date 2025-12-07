import { Metadata } from 'next';

import AddAlbum from './AddAlbum';

export const metadata: Metadata = {
  title: 'Add album | Perfect Albums',
};

export default function AddAlbumPage() {
  return <AddAlbum />;
}
