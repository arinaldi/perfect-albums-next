import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { ROUTE_HREF } from 'constants/index';

export default function SignoutPage() {
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    async function signOut() {
      await supabase.auth.signOut();
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    signOut();
  }, [router, supabase]);

  return null;
}
