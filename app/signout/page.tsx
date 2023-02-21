'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTE_HREF } from 'utils/constants';
import { useSupabase } from 'components/SupabaseProvider';

export default function SignoutPage() {
  const router = useRouter();
  const { supabase } = useSupabase();

  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut();
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    signOut();
  }, [router, supabase]);

  return null;
}
