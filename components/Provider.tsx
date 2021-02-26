import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import api from 'utils/api';
import { getToken } from 'utils/storage';
import { Action, providerReducer, providerInitialState, State } from 'reducers/provider';
import { DISPATCH_TYPES, TOAST_TIMEOUT } from 'constants/index';

interface Props {
  children: ReactNode;
}

const StateContext = createContext<State>(providerInitialState);
const DispatchContext = createContext<Dispatch<Action>>(() => undefined);

const Provider: FC<Props> = ({ children }) => {
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
              payload: {
                data: token,
              },
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
};

function useAppState(): State {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a Provider');
  }

  return context;
}

function useAppDispatch(): Dispatch<Action> {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a Provider');
  }

  return context;
}

function useApp(): [State, Dispatch<Action>] {
  return [useAppState(), useAppDispatch()];
}

export { Provider, useApp, useAppDispatch, useAppState };
