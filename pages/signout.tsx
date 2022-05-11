import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { ROUTE_HREF } from 'constants/index';
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
