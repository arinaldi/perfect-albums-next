import 'server-only';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { createClient } from 'utils/supabase-server';
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
  const supabase = createClient();
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

    const supabase = createClient();
    const url = headers().get('referer')?.split('?');
    const query = url && url.length > 1 ? url[1] : '';
    const { id } = Object.fromEntries(formData.entries());
    const { error } = await supabase.from('albums').delete().eq('id', id);

    if (error) {
      console.error(error.message);
    } else {
      revalidatePath('/admin');
      redirect(`/admin${query ? `?${query}` : ''}`);
    }
  }

  return (
    <AppLayout title="Delete Album">
      <form action={deleteAlbum}>
        <div className="bg-white p-6 dark:bg-gray-800 dark:text-white">
          Are you sure you want to delete {data.artist} – {data.title}?
          <input name="id" type="hidden" value={data.id} />
        </div>
        <div className="flex items-center px-6">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
