import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

import { type Database } from 'utils/db-types';

function createFetch(options: Pick<RequestInit, 'next' | 'cache'>) {
  return function (url: RequestInfo | URL, init?: RequestInit) {
    return fetch(url, {
      ...init,
      ...options,
    });
  };
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {}
        },
      },
      global: {
        fetch: createFetch({
          next: {
            revalidate: 3600,
            tags: ['supabase'],
          },
        }),
      },
    },
  );
}

export type SupabaseClient = Awaited<ReturnType<typeof createClient>>;
