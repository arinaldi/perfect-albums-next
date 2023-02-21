'use client';

import { createContext, useContext, useState } from 'react';
import { createClient } from 'utils/supabase-browser';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from 'utils/db-types';
import type { Children } from 'utils/types';

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children }: Children) {
  const [supabase] = useState(() => createClient());

  return <Context.Provider value={{ supabase }}>{children}</Context.Provider>;
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
