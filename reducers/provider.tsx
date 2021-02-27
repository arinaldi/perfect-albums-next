import { DISPATCH_TYPES, MODAL_TYPES, TOAST_TYPES } from 'constants/index';

interface Modal {
  data: any;
  isOpen: boolean;
  type: MODAL_TYPES;
}

interface Toast {
  isOpen: boolean;
  message: string;
  type: TOAST_TYPES;
}

export interface State {
  modal: Modal;
  toast: Toast;
}

export interface Action {
  payload?: {
    data?: any;
    message?: string;
    type?: MODAL_TYPES | TOAST_TYPES;
  };
  type: DISPATCH_TYPES;
}

export const providerInitialState = {
  modal: {
    data: null,
    isOpen: false,
    type: MODAL_TYPES.FEATURED_SONGS_CREATE,
  },
  toast: {
    isOpen: false,
    message: '',
    type: TOAST_TYPES.INFO,
  },
};

export function providerReducer(state: State, action: Action): State {
  const { payload, type } = action;

  switch (type) {
  case DISPATCH_TYPES.OPEN_TOAST:
    return {
      ...state,
      toast: {
        isOpen: true,
        message: payload?.message || '',
        type: payload?.type,
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
        data: payload?.data || '',
        isOpen: true,
        type: payload?.type,
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