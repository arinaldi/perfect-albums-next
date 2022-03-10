import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

import supabase from 'utils/supabase';

interface AuthState {
  user: User | null | undefined;
}

const useStore = create<AuthState>(
  devtools(
    (_) => ({
      user: undefined,
    }),
    { name: 'Auth store' },
  ),
);

export default useStore;

export function useUser() {
  return useStore((state) => state.user);
}

supabase.auth.onAuthStateChange(
  async (event: AuthChangeEvent, session: Session | null) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });

    useStore.setState({ user: session?.user });
  },
);
