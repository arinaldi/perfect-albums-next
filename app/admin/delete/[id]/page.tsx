import 'server-only';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { createClient } from 'utils/supabase/server';
import DeleteAlbum from './DeleteAlbum';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Delete album | Perfect Albums',
};

export default async function DeleteAlbumPage({ params: { id } }: Props) {
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  return <DeleteAlbum album={data} />;
}
