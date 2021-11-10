import { ReactNode, useEffect } from 'react';
import router from 'next/router';
import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  AuthChangeEvent,
  Provider,
  Session,
  User,
} from '@supabase/supabase-js';
import { SWRConfig } from 'swr';

import supabase from 'utils/supabase';

interface Response {
  data: Session | null;
  error: any;
  provider?: Provider | undefined;
  session: Session | null;
  url?: string | null | undefined;
  user: User | null;
}

interface AuthState {
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => Promise<void>;
  user: User | null | undefined;
}

interface Props {
  children: ReactNode;
}

const store = (set: SetState<AuthState>) => ({
  signIn: async (email: string, password: string) =>
    await supabase.auth.signIn({ email, password }),
  signOut: async () => {
    await supabase.auth.signOut();

    if (router.pathname.startsWith('/admin')) {
      router.push('/top-albums');
    }
  },
  user: undefined,
});

const useAuthStore = create<AuthState>(
  process.env.NODE_ENV === 'development'
    ? devtools(store, 'Auth store')
    : store,
);

export default useAuthStore;

async function handleAuthChange(
  event: AuthChangeEvent,
  session: Session | null,
) {
  await fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session }),
  });
}

supabase.auth.onAuthStateChange((event, session) => {
  handleAuthChange(event, session);
  useAuthStore.setState({ user: session?.user || null });
});

export async function fetcher(url: string): Promise<any> {
  return window
    .fetch(url, { headers: { 'Content-Type': 'application/json' } })
    .then((res) => res.json());
}

export function SWRProvider({ children }: Props) {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user === undefined && supabase.auth.user() === null) {
      useAuthStore.setState({ user: null });
    }
  }, [user]);

  if (user === undefined) return null;

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
