'use client';
import { createContext, useContext } from 'react';
import { type User } from '@supabase/supabase-js';

import { Children } from '@/utils/types';

const UserContext = createContext<User | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

interface Props extends Children {
  user: User | null;
}

export function UserProvider({ children, user }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
