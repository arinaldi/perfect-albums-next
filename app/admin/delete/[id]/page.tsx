import 'server-only';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createActionClient, createServerClient } from 'utils/supabase-server';
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

export default async function DeleteAlbumPage({ params }: Props) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  async function deleteAlbum(formData: FormData) {
    'use server';
    const supabase = createActionClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error(MESSAGES.NOT_AUTHORIZED);
    }

    const referer = headers().get('referer') ?? '';
    const url = new URL(referer);
    const { id } = Object.fromEntries(formData.entries());
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
          <input name="id" type="hidden" value={data.id} />
        </div>
        <div className="mt-6 flex items-center">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
