'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { type MutateResult } from '@/utils/types';
import { releaseSchema, type ReleaseInput } from './schema';

export async function addRelease(release: ReleaseInput): Promise<MutateResult> {
  const result = releaseSchema.safeParse(release);

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

  const { error } = await supabase.from('releases').insert({
    ...release,
    date: release.date || null,
  });

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/releases');

  return {
    data: null,
    type: 'success',
  };
}

export async function editRelease(
  id: number,
  release: ReleaseInput,
): Promise<MutateResult> {
  const result = releaseSchema.safeParse(release);

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

  const { error } = await supabase
    .from('releases')
    .update({
      ...release,
      date: release.date || null,
    })
    .eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/releases');

  return {
    data: null,
    type: 'success',
  };
}

export async function deleteRelease(id: number): Promise<MutateResult> {
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

  const { error } = await supabase.from('releases').delete().eq('id', id);

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  revalidatePath('/releases');

  return {
    data: null,
    type: 'success',
  };
}
