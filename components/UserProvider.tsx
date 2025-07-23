'use client';
import { createContext, useContext } from 'react';
import { type JwtPayload, type User } from '@supabase/supabase-js';

import { Children } from '@/utils/types';

interface Context {
  user: JwtPayload | null;
}

const UserContext = createContext<Context>({ user: null });

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context.user;
}

interface Props extends Children {
  user: JwtPayload | null;
}

export function UserProvider({ children, user }: Props) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
