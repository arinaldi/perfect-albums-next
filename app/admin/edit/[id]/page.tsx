import { notFound } from 'next/navigation';

import { createClient } from 'utils/supabase/server';
import EditAlbum from './EditAlbum';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: 'Edit album | Perfect Albums',
};

export default async function EditAlbumPage(props: Props) {
  const supabase = await createClient();
  const { id } = await props.params;
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
