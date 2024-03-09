'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { EMAIL, MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { signInSchema, verifyOtpSchema, type State } from './schema';

export async function signIn(_: State, formData: FormData): Promise<State> {
  const form = Object.fromEntries(formData.entries());
  const result = signInSchema.safeParse(form);
  const id = crypto.randomUUID().split('-')[1];

  if (form.name || !result.success || result.data.email !== EMAIL) {
    return {
      message: `${MESSAGES.INVALID_DATA} - ${id}`,
    };
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithPassword(result.data);

  if (error) {
    return {
      message: `${error.message} - ${id}`,
    };
  }

  redirect(ROUTES_ADMIN.base.href);
}

export async function sendOtp(email: string) {
  if (email !== EMAIL) {
    throw new Error('Invalid email');
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  if (error) throw error;
}

export async function verifyOtp(_: State, formData: FormData): Promise<State> {
  const form = Object.fromEntries(formData.entries());
  const result = verifyOtpSchema.safeParse(form);
  const id = crypto.randomUUID().split('-')[1];

  if (form.name || !result.success || result.data.email !== EMAIL) {
    return {
      message: `${MESSAGES.INVALID_DATA} - ${id}`,
    };
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.verifyOtp({
    email: result.data.email,
    token: result.data.code,
    type: 'email',
  });

  if (error) {
    return {
      message: `${error.message} - ${id}`,
    };
  }

  redirect(ROUTES_ADMIN.base.href);
}
