'use server';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/user';
import { type MutateResult } from '@/utils/types';
import { albumSchema, type AlbumInput } from './schema';

export async function addAlbum(input: AlbumInput): Promise<MutateResult> {
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const result = albumSchema.safeParse(input);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { year, ...rest } = result.data;
  const supabase = await createClient();
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
  input: AlbumInput,
): Promise<MutateResult> {
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const supabase = await createClient();
  const { data: album } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (!album) {
    return {
      message: MESSAGES.NO_DATA,
      type: 'error',
    };
  }

  const result = albumSchema.safeParse(input);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { year, ...rest } = result.data;

  if (album.favorite && !rest.favorite) {
    const { data: ranking } = await supabase
      .from('rankings')
      .select('*')
      .eq('album_id', id)
      .single();

    if (ranking) {
      await supabase.from('rankings').delete().eq('id', ranking.id);
    }
  }

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
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const supabase = await createClient();
  const { data: album } = await supabase
    .from('albums')
    .select('*')
    .eq('id', id)
    .single();

  if (!album) {
    return {
      message: MESSAGES.NO_DATA,
      type: 'error',
    };
  }

  if (album.favorite) {
    const { data: ranking } = await supabase
      .from('rankings')
      .select('*')
      .eq('album_id', id)
      .single();

    if (ranking) {
      await supabase.from('rankings').delete().eq('id', ranking.id);
    }
  }

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
