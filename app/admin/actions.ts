'use server';
import { headers } from 'next/headers';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { type MutateResult } from '@/utils/types';
import { albumSchema, type AlbumInput } from './schema';

export async function addAlbum(album: AlbumInput): Promise<MutateResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const result = albumSchema.safeParse(album);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { year, ...rest } = result.data;
  const { error } = await supabase.from('albums').insert({
    ...rest,
    year: year.toString(),
  });

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  return {
    data: null,
    type: 'success',
  };
}

export async function editAlbum(
  id: number,
  album: AlbumInput,
): Promise<MutateResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const result = albumSchema.safeParse(album);

  if (!id || !result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { year, ...rest } = result.data;
  const referer = headers().get('referer') ?? '';
  const url = new URL(referer);
  const { error } = await supabase
    .from('albums')
    .update({
      ...rest,
      year: year.toString(),
    })
    .eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  return {
    data: null,
    type: 'success',
  };
}

export async function deleteAlbum(id: number): Promise<MutateResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  if (!id) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const referer = headers().get('referer') ?? '';
  const url = new URL(referer);
  const { error } = await supabase.from('albums').delete().eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  return {
    data: null,
    type: 'success',
  };
}
