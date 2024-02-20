import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
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
  title: 'Edit album | Perfect albums',
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
      <form action={editAlbum}>
        <div className="bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              label="Studio album"
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
        <div className="mt-6 flex items-center">
          <SubmitButton />
        </div>
      </form>
    </AppLayout>
  );
}
