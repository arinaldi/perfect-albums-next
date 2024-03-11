'use server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { albumSchema, deleteAlbumSchema, type State } from './schema';

export async function addAlbum(_: State, formData: FormData): Promise<State> {
  const id = crypto.randomUUID().split('-')[1];
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: `${MESSAGES.NOT_AUTHORIZED} - ${id}`,
    };
  }

  const form = Object.fromEntries(formData.entries());
  const result = albumSchema.safeParse(form);

  if (!result.success) {
    return {
      message: `${MESSAGES.INVALID_DATA} - ${id}`,
    };
  }

  const { id: albumId, year, ...rest } = result.data;
  const referer = headers().get('referer') ?? '';
  const url = new URL(referer);
  const { error } = await supabase.from('albums').insert({
    ...rest,
    year: year.toString(),
  });

  if (error) {
    return {
      message: `${error.message} - ${id}`,
    };
  }

  redirect(`/${ROUTES_ADMIN.base.href}${url.search}`);
}

export async function editAlbum(_: State, formData: FormData): Promise<State> {
  const id = crypto.randomUUID().split('-')[1];
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: `${MESSAGES.NOT_AUTHORIZED} - ${id}`,
    };
  }

  const form = Object.fromEntries(formData.entries());
  const result = albumSchema.safeParse(form);

  if (!result.success || !result.data.id) {
    return {
      message: `${MESSAGES.INVALID_DATA} - ${id}`,
    };
  }

  const { id: albumId, year, ...rest } = result.data;
  const referer = headers().get('referer') ?? '';
  const url = new URL(referer);
  const { error } = await supabase
    .from('albums')
    .update({
      ...rest,
      year: year.toString(),
    })
    .eq('id', albumId);

  if (error) {
    return {
      message: `${error.message} - ${id}`,
    };
  }

  redirect(`/admin${url.search}`);
}

export async function deleteAlbum(
  _: State,
  formData: FormData,
): Promise<State> {
  const id = crypto.randomUUID().split('-')[1];
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: `${MESSAGES.NOT_AUTHORIZED} - ${id}`,
    };
  }

  const form = Object.fromEntries(formData.entries());
  const result = deleteAlbumSchema.safeParse(form);

  if (!result.success) {
    return {
      message: `${MESSAGES.INVALID_DATA} - ${id}`,
    };
  }

  const referer = headers().get('referer') ?? '';
  const url = new URL(referer);
  const { error } = await supabase
    .from('albums')
    .delete()
    .eq('id', result.data.id);

  if (error) {
    return {
      message: `${error.message} - ${id}`,
    };
  }

  redirect(`/admin${url.search}`);
}
