import 'server-only';
import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import AppLayout from 'components/AppLayout';
import SubmitButton from 'components/SubmitButton';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Delete album | Perfect albums',
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

  async function deleteAlbum() {
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
    const { error } = await supabase.from('albums').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    redirect(`/admin${url.search}`);
  }

  return (
    <AppLayout title="Delete album">
      <form action={deleteAlbum} className="space-y-8">
        <div className="text-sm leading-7">
          Are you sure you want to delete {data.artist} – {data.title}?
        </div>
        <SubmitButton className="w-full sm:w-auto" />
      </form>
    </AppLayout>
  );
}
