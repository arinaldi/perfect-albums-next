'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { SignInInput, signInSchema } from './schema';

export async function signIn(data: SignInInput) {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    throw new Error(MESSAGES.INVALID_DATA);
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) throw error;

  redirect(ROUTES_ADMIN.base.href);
}
