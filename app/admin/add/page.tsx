import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import AppLayout from 'components/AppLayout';
import AlbumForm from '../AlbumForm';
import { albumSchema } from '../schema';

export const metadata = {
  title: 'Add album | Perfect Albums',
};

export default function AddAlbumPage() {
  async function addAlbum(formData: FormData) {
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
    const { error } = await supabase.from('albums').insert({
      ...data,
      year: data.year.toString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect(`/admin${url.search}`);
  }

  return (
    <AppLayout title="Add album">
      <AlbumForm action={addAlbum} />
    </AppLayout>
  );
}
