import 'server-only';
import { cache } from 'react';

import { createClient } from './server';

async function getClaims() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getClaims();

    if (!data || error) return null;

    return data.claims;
  } catch (error) {
    return null;
  }
}

export const getUser = cache(getClaims);
