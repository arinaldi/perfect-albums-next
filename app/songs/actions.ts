'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { type MutateResult } from '@/utils/types';
import { SongInput, songSchema } from './schema';

export async function addSong(song: SongInput): Promise<MutateResult> {
  const result = songSchema.safeParse(song);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const { error } = await supabase.from('songs').insert(song);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/songs');

  return {
    data: null,
    type: 'success',
  };
}

export async function editSong(
  id: number,
  song: SongInput,
): Promise<MutateResult> {
  const result = songSchema.safeParse(song);

  if (!id || !result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const { error } = await supabase.from('songs').update(song).eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/songs');

  return {
    data: null,
    type: 'success',
  };
}

export async function deleteSong(id: number): Promise<MutateResult> {
  if (!id) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const { error } = await supabase.from('songs').delete().eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/songs');

  return {
    data: null,
    type: 'success',
  };
}
