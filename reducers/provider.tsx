import { DISPATCH_TYPES, MODAL_TYPES, TOAST_TYPES } from 'constants/index';
import { ListItem } from 'utils';
import { Song } from 'utils/types';

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

interface OpenModalAction {
  payload: {
    data?: ListItem | Song;
    type: MODAL_TYPES;
  };
  type: DISPATCH_TYPES.OPEN_MODAL;
}

interface CloseModalAction {
  type: DISPATCH_TYPES.CLOSE_MODAL;
}

interface OpenToastAction {
  payload: {
    message: string;
    type: TOAST_TYPES;
  };
  type: DISPATCH_TYPES.OPEN_TOAST;
}

interface CloseToastAction {
  type: DISPATCH_TYPES.CLOSE_TOAST;
}

export type Action = OpenModalAction | CloseModalAction | OpenToastAction | CloseToastAction;

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
  switch (action.type) {
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
