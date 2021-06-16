import { DISPATCH_TYPES, MODAL_TYPES } from 'constants/index';
import { ListItem } from 'utils';
import { Song } from 'utils/types';

interface Modal {
  data: any;
  isOpen: boolean;
  type: MODAL_TYPES;
}

export interface State {
  modal: Modal;
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

export type Action = OpenModalAction | CloseModalAction;

export const providerInitialState = {
  modal: {
    data: null,
    isOpen: false,
    type: MODAL_TYPES.FEATURED_SONGS_CREATE,
  },
};

export function providerReducer(state: State, action: Action): State {
  switch (action.type) {
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
