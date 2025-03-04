import 'server-only';
import { createClient as createGeneralClient } from '@supabase/supabase-js';

import type { Database } from 'utils/db-types';

export function createClient() {
  return createGeneralClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
