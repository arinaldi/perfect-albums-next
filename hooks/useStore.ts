import { proxy, useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

import supabase from 'utils/supabase';

type Resolve = (value?: unknown) => void;

interface State {
  user: Promise<unknown> | User | null | undefined;
}

let resolve: Resolve;
const initialUser = new Promise((r) => {
  resolve = r;
});

const state = proxy<State>({
  user: initialUser,
});

if (process.env.NODE_ENV === 'development') {
  devtools(state, 'Auth store');
}

function resolveUser(user: User | null) {
  resolve();
  state.user = user;
}

supabase.auth.onAuthStateChange(
  async (event: AuthChangeEvent, session: Session | null) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });

    resolveUser(supabase.auth.user());
  },
);

resolveUser(supabase.auth.user());

export default function useStore() {
  return useSnapshot(state);
}
