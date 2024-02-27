import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import AppLayout from 'components/AppLayout';
import { Checkbox } from 'components/ui/checkbox';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { SubmitButton } from 'components/ui/submit-button';
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="artist">Artist</Label>
          <Input
            autoFocus
            defaultValue={data.artist}
            id="artist"
            name="artist"
            required
          />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input defaultValue={data.title} id="title" name="title" required />
        </div>
        <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="year">Year</Label>
          <Input
            defaultValue={data.year}
            id="year"
            name="year"
            required
            type="number"
          />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox defaultChecked={data.studio} id="studio" name="studio" />
          <label htmlFor="studio" className="text-sm font-medium leading-none">
            Studio album
          </label>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox defaultChecked={data.cd} id="cd" name="cd" />
          <label htmlFor="cd" className="text-sm font-medium leading-none">
            CD
          </label>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            defaultChecked={data.favorite}
            id="favorite"
            name="favorite"
          />
          <label
            htmlFor="favorite"
            className="text-sm font-medium leading-none"
          >
            Favorite
          </label>
        </div>
        <SubmitButton className="mt-6 w-full sm:w-auto" />
      </form>
    </AppLayout>
  );
}
