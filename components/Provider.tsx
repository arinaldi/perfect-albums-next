import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { Action, providerReducer, providerInitialState, State } from 'reducers/provider';

interface Props {
  children: ReactNode;
}

const StateContext = createContext<State>(providerInitialState);
const DispatchContext = createContext<Dispatch<Action>>(() => undefined);

const Provider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(providerReducer, providerInitialState);

  return (
    <StateContext.Provider value={state}>
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
