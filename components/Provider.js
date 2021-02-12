import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import api from '../utils/api';
import { getToken } from '../utils/storage';
import { providerReducer, providerInitialState } from '../reducers/provider';
import { DISPATCH_TYPES } from '../constants';

export const StateContext = createContext();
export const DispatchContext = createContext();

function Provider (props) {
  const { children } = props;
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);

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
    };

    checkUser();
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useAppState () {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
}

function useAppDispatch () {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
}

function useApp () {
  return [useAppState(), useAppDispatch()];
}

export { Provider, useApp, useAppDispatch, useAppState };
