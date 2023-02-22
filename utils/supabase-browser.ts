import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from 'utils/db-types';

export function createClient() {
  return createBrowserSupabaseClient<Database>();
}
