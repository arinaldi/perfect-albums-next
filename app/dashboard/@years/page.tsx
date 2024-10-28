import AppMessage from '@/components/AppMessage';
import { createClient } from 'utils/supabase/server';
import AlbumsByYear, { type CountByYear } from './AlbumsByYear';

export default async function DashboardYears() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('albums_by_year');

  if (!data || error) return <AppMessage />;

  const stats = data as unknown as CountByYear[];

  return <AlbumsByYear data={stats} />;
}
