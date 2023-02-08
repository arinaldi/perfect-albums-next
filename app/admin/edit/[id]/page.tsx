import 'server-only';
import { cookies, headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import EditAlbum from 'app/admin/edit/[id]/EditAlbum';
import { Database } from 'utils/db-types';

interface Props {
  params: {
    id: string;
  };
}

export const revalidate = 0;
export const metadata = {
  title: 'Perfect Albums | Edit Album',
};

export default async function EditAlbumPage({ params }: Props) {
  const supabase = createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });
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
