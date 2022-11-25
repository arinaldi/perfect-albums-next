import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { Database } from 'utils/db-types';

export default createBrowserSupabaseClient<Database>();
