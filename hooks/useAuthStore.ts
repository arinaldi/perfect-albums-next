import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

import supabase from 'utils/supabase';

interface AuthState {
  user: User | null | undefined;
}

const useAuthStore = create<AuthState>()(
  devtools(
    (_) => ({
      user: undefined,
    }),
    { name: 'Auth store' },
  ),
);

export default useAuthStore;

export function useUser() {
  return useAuthStore((state) => state.user);
}

supabase.auth.onAuthStateChange(
  async (event: AuthChangeEvent, session: Session | null) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });

    useAuthStore.setState({ user: session?.user });
  },
);
