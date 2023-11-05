'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { signInSchema, type State } from './schema';

export async function signIn(_: State, formData: FormData) {
  const form = Object.fromEntries(formData.entries());
  const result = signInSchema.safeParse(form);

  if (!result.success) {
    return {
      message: MESSAGES.INVALID_DATA,
    };
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect(ROUTES_ADMIN.base.href);
}
