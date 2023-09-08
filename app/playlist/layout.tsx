import AppLayout from 'components/AppLayout';
import { Children } from 'utils/types';

export default function PlaylistLayout({ children }: Children) {
  return <AppLayout title="Playlist">{children}</AppLayout>;
}
