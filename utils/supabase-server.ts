import { cookies } from 'next/headers';
import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import type { Database } from 'utils/db-types';

export function createServerClient() {
  return createServerComponentClient<Database>({ cookies });
}

export function createActionClient() {
  return createServerActionClient<Database>({ cookies });
}

export function createRouteClient() {
  return createRouteHandlerClient<Database>({ cookies });
}
