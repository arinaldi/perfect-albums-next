import { getToken, removeToken, setToken } from '../utils/storage';
import { DISPATCH_TYPES } from '../constants';

export const providerInitialState = {
  modal: {
    callback: null,
    data: null,
    isOpen: false,
    type: '',
  },
  toast: {
    isOpen: false,
    message: '',
    type: '',
  },
  user: {
    isAuthenticated: Boolean(getToken()),
  },
};

export function providerReducer (state, action) {
  switch (action.type) {
  case DISPATCH_TYPES.SIGN_IN_USER:
    setToken(action.payload);
    return {
      ...state,
      user: { isAuthenticated: true },
    };
  case DISPATCH_TYPES.SIGN_OUT_USER:
    removeToken();
    return {
      ...state,
      user: { isAuthenticated: false },
    };
  case DISPATCH_TYPES.OPEN_TOAST:
    return {
      ...state,
      toast: {
        isOpen: true,
        message: action.payload.message,
        type: action.payload.type,
      },
    };
  case DISPATCH_TYPES.CLOSE_TOAST:
    return {
      ...state,
      toast: {
        ...state.toast,
        isOpen: false,
      },
    };
  case DISPATCH_TYPES.OPEN_MODAL:
    return {
      ...state,
      modal: {
        callback: action.payload.callback,
        data: action.payload.data,
        isOpen: true,
        type: action.payload.type,
      },
    };
  case DISPATCH_TYPES.CLOSE_MODAL:
    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: false,
      },
    };
  default:
    return state;
  }
}
