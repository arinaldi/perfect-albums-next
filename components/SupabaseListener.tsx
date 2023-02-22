'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useSupabase } from 'components/SupabaseProvider';

interface Props {
  serverAccessToken?: string;
}

export default function SupabaseListener({ serverAccessToken }: Props) {
  const router = useRouter();
  const { supabase } = useSupabase();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== serverAccessToken) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, serverAccessToken, supabase]);

  return null;
}
