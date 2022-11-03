import AppLayout from 'components/Layout';
import { Children } from 'utils/types';

export default function ArtistsLayout({ children }: Children) {
  return <AppLayout title="Artists">{children}</AppLayout>;
}
