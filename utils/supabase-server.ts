import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from 'utils/db-types';

export function createClient() {
  return createServerComponentSupabaseClient<Database>({
    cookies,
    headers,
  });
}
