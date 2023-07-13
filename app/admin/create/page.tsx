import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createActionClient } from 'utils/supabase-server';
import AppLayout from 'components/AppLayout';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import SubmitButton from 'app/admin/SubmitButton';
import { albumSchema } from '../schema';

export const metadata = {
  title: 'Create Album | Perfect Albums',
};

export default function CreateAlbumPage() {
  async function createAlbum(formData: FormData) {
    'use server';
    const supabase = createActionClient();
    const url = headers().get('referer')?.split('?');
    const query = url ? url[1] : '';
    const form = Object.fromEntries(formData.entries());
    const data = albumSchema.parse(form);
    const { error } = await supabase.from('albums').insert({
      ...data,
      year: data.year.toString(),
    });

    if (error) {
      throw new Error(error.message);
    }

    redirect(`/admin${query ? `?${query}` : ''}`);
  }

  return (
    <AppLayout title="Create Album">
      <form action={createAlbum}>
        <div className="bg-white dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              id="artist"
              name="artist"
              required
              type="text"
              wrapperClassName="order-1 sm:order-1"
            />
            <Input
              id="title"
              name="title"
              required
              type="text"
              wrapperClassName="order-2 sm:order-3"
            />
            <Input
              defaultValue={new Date().getFullYear().toString()}
              id="year"
              name="year"
              required
              type="number"
              wrapperClassName="order-3 sm:order-5"
            />
            <Checkbox
              id="studio"
              label="Studio Album"
              name="studio"
              wrapperClassName="order-4 sm:order-2"
            />
            <Checkbox
              id="cd"
              label="CD"
              name="cd"
              wrapperClassName="order-5 sm:order-4"
            />
            <Checkbox
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
