import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import api from 'utils/api';
import { getToken } from 'utils/storage';
import { providerReducer, providerInitialState } from 'reducers/provider';
import { DISPATCH_TYPES, TOAST_TIMEOUT } from 'constants/index';

export const StateContext = createContext();
export const DispatchContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.toast.isOpen) {
      setTimeout(() => {
        dispatch({ type: DISPATCH_TYPES.CLOSE_TOAST });
      }, TOAST_TIMEOUT);
    }
  }, [state.toast.isOpen]);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (token) {
        try {
          const { status } = await api('/api/auth');

          if (status === 200) {
            dispatch({
              payload: token,
              type: DISPATCH_TYPES.SIGN_IN_USER,
            });
          } else {
            throw new Error();
          }
        } catch (err) {
          dispatch({
            type: DISPATCH_TYPES.SIGN_OUT_USER,
          });
        }
      }
      setIsLoading(false);
    };

    checkUser();
  }, []);

  return (
    <StateContext.Provider value={{ ...state, isLoading }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
}

function useAppDispatch() {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
}

function useApp() {
  return [useAppState(), useAppDispatch()];
}

export { Provider, useApp, useAppDispatch, useAppState };
