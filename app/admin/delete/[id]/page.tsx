import 'server-only';
import { notFound } from 'next/navigation';

import DeleteAlbum from 'app/admin/delete/[id]/DeleteAlbum';
import { createClient } from 'utils/supabase-server';

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0;
export const metadata = {
  title: 'Delete Album | Perfect Albums',
};

export default async function DeleteAlbumPage({ params }: Props) {
  const supabase = createClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  return <DeleteAlbum album={data} />;
}
