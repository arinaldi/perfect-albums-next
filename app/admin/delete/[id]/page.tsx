import 'server-only';
import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import AppLayout from 'components/AppLayout';
import SubmitButton from 'app/admin/SubmitButton';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Delete Album | Perfect Albums',
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

  async function deleteAlbum(formData: FormData) {
    'use server';
    const supabase = createClient(cookies());
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
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
    <AppLayout title="Delete Album">
      <form action={deleteAlbum}>
        <div className="bg-white dark:bg-gray-800 dark:text-white">
          Are you sure you want to delete {data.artist} – {data.title}?
        </div>
        <div className="mt-6 flex items-center">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
