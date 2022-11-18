'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTE_HREF } from 'utils/constants';
import supabase from 'utils/supabase';

export default function SignoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut();
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    signOut();
  }, [router]);

  return null;
}
