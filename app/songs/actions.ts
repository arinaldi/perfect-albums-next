'use server';
import { revalidatePath } from 'next/cache';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/user';
import { type MutateResult } from '@/utils/types';
import { SongInput, songSchema } from './schema';

export async function addSong(input: SongInput): Promise<MutateResult> {
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const result = songSchema.safeParse(input);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('songs').insert(input);

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
  input: SongInput,
): Promise<MutateResult> {
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const result = songSchema.safeParse(input);

  if (!id || !result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('songs').update(input).eq('id', id);

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
  const user = await getUser();

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

  const supabase = await createClient();
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
