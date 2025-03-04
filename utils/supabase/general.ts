import 'server-only';
import { createClient as createGeneralClient } from '@supabase/supabase-js';

import type { Database } from 'utils/db-types';

function createFetch(options: Pick<RequestInit, 'next' | 'cache'>) {
  return function (url: RequestInfo | URL, init?: RequestInit) {
    return fetch(url, {
      ...init,
      ...options,
    });
  };
}

export function createClient() {
  return createGeneralClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: createFetch({
          cache: 'force-cache',
          next: {
            revalidate: 3600,
            tags: ['supabase'],
          },
        }),
      },
    },
  );
}
