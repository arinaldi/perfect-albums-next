import 'server-only';
import { notFound } from 'next/navigation';

import EditAlbum from 'app/admin/edit/[id]/EditAlbum';
import { createClient } from 'utils/supabase-server';

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0;
export const metadata = {
  title: 'Edit Album | Perfect Albums',
};

export default async function EditAlbumPage({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  return <EditAlbum album={data} />;
}
