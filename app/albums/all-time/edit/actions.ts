'use server';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
