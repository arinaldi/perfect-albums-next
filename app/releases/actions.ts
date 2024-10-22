'use server';
import { revalidatePath } from 'next/cache';

import { MESSAGES } from '@/utils/constants';
import { createClient } from '@/utils/supabase/server';
import { type MutateResult } from '@/utils/types';
import { releaseSchema, type ReleaseInput } from './schema';

export async function addRelease(input: ReleaseInput): Promise<MutateResult> {
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

  const result = releaseSchema.safeParse(input);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { error } = await supabase.from('releases').insert({
    ...input,
    date: input.date || null,
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
  input: ReleaseInput,
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

  const result = releaseSchema.safeParse(input);

  if (!id || !result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
      type: 'error',
    };
  }

  const { error } = await supabase
    .from('releases')
    .update({
      ...input,
      date: input.date || null,
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
