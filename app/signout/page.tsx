'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ROUTE_HREF } from 'utils/constants';
import { createClient } from 'utils/supabase/client';

export default function SignoutPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function signOut() {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error(error.message);
      }

      router.push(ROUTE_HREF.TOP_ALBUMS);
      router.refresh();
    }

    signOut();
  }, [router, supabase]);

  return null;
}
