'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { SongInput, songSchema } from './schema';

export async function createSong(song: SongInput) {
  const result = songSchema.safeParse(song);

  if (!result.success) {
    throw new Error(MESSAGES.INVALID_DATA);
  }

  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error(MESSAGES.NOT_AUTHORIZED);
  }

  const { error } = await supabase.from('songs').insert(song);

  if (error) throw error;

  revalidatePath('/songs');
}

export async function deleteSong(id: number) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error(MESSAGES.NOT_AUTHORIZED);
  }

  const { error } = await supabase.from('songs').delete().eq('id', id);

  if (error) throw error;

  revalidatePath('/songs');
}
