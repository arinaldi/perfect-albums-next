'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from 'utils/supabase';

interface Props {
  accessToken?: string;
}

export default function SupabaseListener({ accessToken }: Props) {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [accessToken, router]);

  return null;
}
