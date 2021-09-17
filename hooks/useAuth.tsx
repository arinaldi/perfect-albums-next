import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import toast from 'react-hot-toast';

import { MESSAGES } from 'constants/index';
import initFirebase from 'auth/initFirebase';
import { removeTokenCookie, setTokenCookie } from 'auth/tokenCookies';

initFirebase();

type CurrentUser = User | null | undefined;

interface Context {
  user: CurrentUser;
  logout: () => void;
}

const AuthContext = createContext<Context>({
  user: undefined,
  logout: () => undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(undefined);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, [auth]);

  const value = useMemo(() => {
    return {
      user,
      logout: async () => {
        try {
          await signOut(auth);
          if (router.pathname.startsWith('/admin')) {
            router.push('/top-albums');
          }
        } catch (error) {
          toast.error(MESSAGES.ERROR);
        }
      },
    };
  }, [auth, router, user]);

  if (user === undefined) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a Provider');
  }

  return context;
}
