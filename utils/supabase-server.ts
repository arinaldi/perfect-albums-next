import { cookies } from 'next/headers';
import {
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import type { Database } from 'utils/db-types';

export function createServerClient() {
  return createServerComponentClient<Database>({
    cookies,
  });
}

export function createActionClient() {
  return createServerActionClient<Database>({ cookies });
}
