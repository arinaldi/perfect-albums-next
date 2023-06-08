import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from 'utils/db-types';

export function createClient() {
  return createClientComponentClient<Database>();
}
