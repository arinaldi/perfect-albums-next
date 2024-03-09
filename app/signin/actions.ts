'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { MESSAGES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/server';
import { signInSchema, verifyOtpSchema, type State } from './schema';

const EMAIL = process.env.EMAIL as string;

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

export async function sendOtp(email: string): Promise<State> {
  if (email !== EMAIL) {
    return {
      message: MESSAGES.ERROR,
    };
  }

  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: false },
  });

  if (error) {
    return {
      message: error.message,
    };
  }

  return { message: '' };
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
