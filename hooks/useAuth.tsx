import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';

import initFirebase from 'auth/initFirebase';
import { removeTokenCookie, setTokenCookie } from 'auth/tokenCookies';

initFirebase();

interface Context {
  user: firebase.User | null;
  logout: () => void;
}

const AuthContext = createContext<Context>({
  user: null,
  logout: () => undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
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
  }, []);

  const value = useMemo(() => {
    return {
      user,
      logout: () => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            router.push('/top-albums');
          })
          .catch((e) => {
            console.error(e); // eslint-disable-line no-console
          });
      },
    };
  }, [router, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): Context {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a Provider');
  }

  return context;
}
