import { notFound } from 'next/navigation';

import { createClient } from 'utils/supabase/server';
import EditAlbum from './EditAlbum';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Edit album | Perfect Albums',
};

export default async function EditAlbumPage({ params: { id } }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  return <EditAlbum album={data} />;
}
