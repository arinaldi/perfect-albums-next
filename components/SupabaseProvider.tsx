'use client';

import { createContext, useContext, useState } from 'react';
import { createClient } from 'utils/supabase-browser';

import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from 'utils/db-types';
import type { Children } from 'utils/types';

interface Props extends Children {
  session: Session | null;
}

type SupabaseContext = {
  session: Session | null;
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({ children, session }: Props) {
  const [supabase] = useState(() => createClient());

  return (
    <Context.Provider value={{ session, supabase }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
