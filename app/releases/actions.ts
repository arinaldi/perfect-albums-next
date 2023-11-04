'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { MESSAGES } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { type ReleaseInput, releaseSchema } from './schema';

export async function createRelease(release: ReleaseInput) {
  const result = releaseSchema.safeParse(release);

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

  const { error } = await supabase.from('releases').insert({
    ...release,
    date: release.date || null,
  });

  if (error) throw error;

  revalidatePath('/releases');
}

export async function editRelease(id: number, release: ReleaseInput) {
  const result = releaseSchema.safeParse(release);

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

  const { error } = await supabase
    .from('releases')
    .update({
      ...release,
      date: release.date || null,
    })
    .eq('id', id);

  if (error) throw error;

  revalidatePath('/releases');
}

export async function deleteRelease(id: number) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error(MESSAGES.NOT_AUTHORIZED);
  }

  const { error } = await supabase.from('releases').delete().eq('id', id);

  if (error) throw error;

  revalidatePath('/releases');
}
