import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import EditAlbum from 'app/admin/edit/[id]/EditAlbum';
import { Album } from 'utils/types';

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function EditAlbumPage({ params }: Props) {
  const supabase = createServerComponentSupabaseClient({ cookies, headers });
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single();
  const album = data as Album;

  return <EditAlbum album={album} />;
}
