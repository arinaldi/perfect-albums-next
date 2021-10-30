import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import { MODAL_TYPES } from 'constants/index';

interface ModalState {
  data: any;
  isOpen: boolean;
  type: MODAL_TYPES;
  openModal: (type: MODAL_TYPES, data?: any) => void;
  closeModal: () => void;
}

const store = (set: SetState<ModalState>) => ({
  data: null,
  isOpen: false,
  type: MODAL_TYPES.INITIAL,
  openModal: (type: MODAL_TYPES, data?: any) => {
    set(() => ({ data, isOpen: true, type }));
  },
  closeModal: () => {
    set(() => ({ isOpen: false }));
  },
});

const useStore = create<ModalState>(
  process.env.NODE_ENV === 'development'
    ? devtools(store, 'Modal store')
    : store,
);

export default useStore;
