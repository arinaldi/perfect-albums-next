'use server';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { type MutateResult } from '@/utils/types';

interface Rankings {
  id: number;
  position: number;
}

export async function editRankings(
  rankings: Rankings[],
  year: string,
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

  const { data: favorites, error: fetchError } = await supabase
    .from('albums')
    .select(
      `
        artist,
        favorite,
        id,
        title,
        year
      `,
    )
    .match({
      favorite: true,
      year,
    });

  if (fetchError) {
    return {
      message: fetchError.message,
      type: 'error',
    };
  }

  const positions = rankings.map((r) => r.position);
  const positionsSet = new Set(positions);

  if (positionsSet.size !== favorites.length) {
    throw new Error('Rankings must be unique');
  }

  const input = rankings.map((r) => ({
    album_id: r.id,
    position: r.position,
    year,
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
