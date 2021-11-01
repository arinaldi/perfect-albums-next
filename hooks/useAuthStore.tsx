import { FC, useEffect } from 'react';
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
  getSessionToken: () => string;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<Response>;
  signOut: () => Promise<void>;
  user: User | null | undefined;
}

let supabaseSession: Session | null;

const store = (set: SetState<AuthState>) => ({
  getSessionToken: () => supabase.auth.session()?.access_token || '',
  setUser: (user: User | null) => {
    set({ user });
  },
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

  const user = session?.user || null;
  supabaseSession = session;

  useAuthStore.setState({ user });
});

export async function fetcher(url: string): Promise<any> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (supabaseSession) {
    headers.authorization = `Bearer ${supabaseSession.access_token}`;
  }

  return window.fetch(url, { headers }).then((res) => res.json());
}

export const SWRProvider: FC = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user === undefined && supabase.auth.user() === null) {
      setUser(null);
    }
  }, [setUser, user]);

  if (user === undefined) return null;

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
