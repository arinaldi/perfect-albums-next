'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTE_HREF } from 'utils/constants';
import { createClient } from '@/utils/supabase-browser';

export default function SignoutPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut();
      router.push(ROUTE_HREF.TOP_ALBUMS);
      router.refresh();
    }

    signOut();
  }, [router, supabase]);

  return null;
}
