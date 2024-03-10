import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import AppLayout from 'components/AppLayout';
import AlbumForm from '../../AlbumForm';
import { albumSchema } from '../../schema';

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
  const supabase = createClient(cookies());
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) {
    notFound();
  }

  async function editAlbum(formData: FormData) {
    'use server';
    const supabase = createClient(cookies());
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error(MESSAGES.NOT_AUTHORIZED);
    }

    const referer = headers().get('referer') ?? '';
    const url = new URL(referer);
    const form = Object.fromEntries(formData.entries());
    const data = albumSchema.parse(form);
    const { error } = await supabase
      .from('albums')
      .update({
        ...data,
        year: data.year.toString(),
      })
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    redirect(`/admin${url.search}`);
  }

  return (
    <AppLayout title="Edit album">
      <AlbumForm action={editAlbum} data={data} />
    </AppLayout>
  );
}
