import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';

import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from 'constants/index';

const { ASC, DESC } = SORT_DIRECTION;

export interface AdminState {
  page: number;
  perPage: PER_PAGE;
  sort: SORT_VALUE;
  direction: SORT_DIRECTION;
  studio: boolean;
  onPageChange: (value: number) => void;
  onPerPageChange: (value: PER_PAGE) => void;
  onSort: (value: SORT_VALUE) => void;
  onFilter: () => void;
  onSearch: () => void;
  onClear: () => void;
}

const initialState = {
  page: 1,
  perPage: PER_PAGE.SMALL,
  sort: SORT_VALUE.NONE,
  direction: SORT_DIRECTION.NONE,
  studio: false,
};

const store = (set: SetState<AdminState>, get: GetState<AdminState>) => ({
  ...initialState,
  onPageChange: (value: number) => {
    set({ page: value });
  },
  onPerPageChange: (value: PER_PAGE) => {
    set({ page: 1, perPage: value });
  },
  onSort: (value: SORT_VALUE) => {
    const sort = get().sort;
    const direction = get().direction;
    let newDirection = DESC;

    if (sort !== value || !direction || direction === DESC) {
      newDirection = ASC;
    }

    set({ page: 1, sort: value, direction: newDirection });
  },
  onFilter: () => {
    set({ studio: !get().studio });
  },
  onSearch: () => {
    set({ page: 1, sort: SORT_VALUE.YEAR, direction: SORT_DIRECTION.ASC });
  },
  onClear: () => {
    set(initialState);
  },
});

const useAdminStore = create<AdminState>(
  process.env.NODE_ENV === 'development'
    ? devtools(store, { name: 'Admin store' })
    : store,
);

export function useAdmin() {
  const direction = useAdminStore((state) => state.direction);
  const page = useAdminStore((state) => state.page);
  const perPage = useAdminStore((state) => state.perPage);
  const sort = useAdminStore((state) => state.sort);
  const studio = useAdminStore((state) => state.studio);
  const onClear = useAdminStore((state) => state.onClear);
  const onSearch = useAdminStore((state) => state.onSearch);
  const onSort = useAdminStore((state) => state.onSort);

  return { direction, page, perPage, sort, studio, onClear, onSearch, onSort };
}

export function usePagination() {
  const page = useAdminStore((state) => state.page);
  const onPageChange = useAdminStore((state) => state.onPageChange);

  return { page, onPageChange };
}

export function usePerPage() {
  const perPage = useAdminStore((state) => state.perPage);
  const onPerPageChange = useAdminStore((state) => state.onPerPageChange);

  return { perPage, onPerPageChange };
}

export function useStudioFilter() {
  const studio = useAdminStore((state) => state.studio);
  const onFilter = useAdminStore((state) => state.onFilter);

  return { studio, onFilter };
}
