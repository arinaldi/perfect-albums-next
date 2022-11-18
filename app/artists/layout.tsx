import AppLayout from 'components/AppLayout';
import { Children } from 'utils/types';

export default function ArtistsLayout({ children }: Children) {
  return <AppLayout title="Artists">{children}</AppLayout>;
}
