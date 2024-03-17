'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { MutateResult } from '@/utils/types';
import { ROUTE_HREF } from '@/utils/constants';

export async function signOut(): Promise<MutateResult> {
  const supabase = createClient(cookies());
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      message: error.message,
      type: 'error',
    };
  }

  redirect(ROUTE_HREF.TOP_ALBUMS);
}
