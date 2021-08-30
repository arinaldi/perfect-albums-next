import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { getAuth, onIdTokenChanged, signOut, User } from 'firebase/auth';

import initFirebase from 'auth/initFirebase';
import { removeTokenCookie, setTokenCookie } from 'auth/tokenCookies';

initFirebase();

interface Context {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<Context>({
  user: null,
  logout: () => undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth, async (user) => {
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
      cancelAuthListener();
    };
  }, [auth]);

  const value = useMemo(() => {
    return {
      user,
      logout: () => {
        signOut(auth)
          .then(() => {
            router.push('/top-albums');
          })
          .catch((e) => {
            console.error(e); // eslint-disable-line no-console
          });
      },
    };
  }, [auth, router, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a Provider');
  }

  return context;
}
