'use server';
import { revalidatePath } from 'next/cache';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { getUser } from '@/utils/supabase/user';
import { type MutateResult } from '@/utils/types';

interface Rankings {
  all_time_position: number;
  id: number;
  position: number;
  year: string;
}

export async function editAllTimeRankings(
  rankings: Rankings[],
): Promise<MutateResult> {
  const user = await getUser();

  if (!user) {
    return {
      message: MESSAGES.NOT_AUTHORIZED,
      type: 'error',
    };
  }

  const input = rankings.map((r) => ({
    album_id: r.id,
    all_time_position: r.all_time_position,
    position: r.position,
    year: r.year,
  }));
  const supabase = await createClient();
  const { error: upsertError } = await supabase
    .from('rankings')
    .upsert(input, { onConflict: 'album_id' });

  if (upsertError) {
    return {
      message: upsertError.message,
      type: 'error',
    };
  }

  return {
    data: null,
    type: 'success',
  };
}

export async function removeAllTimeRanking(id: number): Promise<MutateResult> {
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
  const { error } = await supabase
    .from('rankings')
    .update({
      all_time_position: null,
    })
    .eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/albums/all-time/edit');

  return {
    data: null,
    type: 'success',
  };
}
