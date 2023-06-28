import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { createActionClient, createServerClient } from 'utils/supabase-server';
import AppLayout from 'components/AppLayout';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import SubmitButton from 'app/admin/SubmitButton';
import { albumSchema } from '../../schema';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'Edit Album | Perfect Albums',
};

export default async function EditAlbumPage({ params }: Props) {
  const supabase = createServerClient();
  const { data } = await supabase
    .from('albums')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) {
    notFound();
  }

  async function editAlbum(formData: FormData) {
    'use server';
    const supabase = createActionClient();
    const url = headers().get('referer')?.split('?');
    const query = url && url.length > 1 ? url[1] : '';
    const form = Object.fromEntries(formData.entries());
    const { id, ...data } = albumSchema.parse(form);
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

    redirect(`/admin${query ? `?${query}` : ''}`);
  }

  return (
    <AppLayout title="Edit Album">
      <form action={editAlbum}>
        <div className="bg-white p-6 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input name="id" type="hidden" value={data.id} />
            <Input
              defaultValue={data.artist}
              id="artist"
              name="artist"
              required
              type="text"
              wrapperClassName="order-1 sm:order-1"
            />
            <Input
              defaultValue={data.title}
              id="title"
              name="title"
              required
              type="text"
              wrapperClassName="order-2 sm:order-3"
            />
            <Input
              defaultValue={data.year}
              id="year"
              name="year"
              required
              type="number"
              wrapperClassName="order-3 sm:order-5"
            />
            <Checkbox
              defaultChecked={data.studio}
              id="studio"
              label="Studio Album"
              name="studio"
              wrapperClassName="order-4 sm:order-2"
            />
            <Checkbox
              defaultChecked={data.cd}
              id="cd"
              label="CD"
              name="cd"
              wrapperClassName="order-5 sm:order-4"
            />
            <Checkbox
              defaultChecked={data.favorite}
              id="favorite"
              label="Favorite"
              name="favorite"
              wrapperClassName="order-6 sm:order-6"
            />
          </div>
        </div>
        <div className="flex items-center px-6">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
