import 'server-only';
import { cache } from 'react';

import { createClient } from './server';

async function getSessionUser() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return null;
    }

    return data.user;
  } catch (error) {
    return null;
  }
}

export const getUser = cache(getSessionUser);
