import { useMemo } from 'react';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import shallow from 'zustand/shallow';

import { PER_PAGE, SORT_DIRECTION, SORT_VALUE } from 'constants/index';
import usePrefetch from 'hooks/usePrefetch';
import { generateAlbumsUrl } from 'utils';

const { ASC, DESC } = SORT_DIRECTION;

export interface AdminState {
  artist: string;
  title: string;
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
  setArtist: (value: string) => void;
  setTitle: (value: string) => void;
}

const initialState = {
  artist: '',
  title: '',
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
    set({ page: 1, studio: !get().studio });
  },
  onSearch: () => {
    set({ page: 1, sort: SORT_VALUE.YEAR, direction: SORT_DIRECTION.ASC });
  },
  onClear: () => {
    set(initialState);
  },
  setArtist: (value: string) => {
    set({ artist: value });
  },
  setTitle: (value: string) => {
    set({ title: value });
  },
});

const useAdminStore = create<AdminState>(
  process.env.NODE_ENV === 'development'
    ? devtools(store, { name: 'Admin store' })
    : store,
);

export function useAdmin() {
  return useAdminStore(
    ({
      artist,
      direction,
      page,
      perPage,
      sort,
      studio,
      title,
      onClear,
      onSearch,
      onSort,
      setArtist,
      setTitle,
    }) => ({
      artist,
      direction,
      page,
      perPage,
      sort,
      studio,
      title,
      onClear,
      onSearch,
      onSort,
      setArtist,
      setTitle,
    }),
    shallow,
  );
}

export function usePagination() {
  const prefetch = usePrefetch();
  const artist = useAdminStore((state) => state.artist);
  const direction = useAdminStore((state) => state.direction);
  const page = useAdminStore((state) => state.page);
  const perPage = useAdminStore((state) => state.perPage);
  const sort = useAdminStore((state) => state.sort);
  const studio = useAdminStore((state) => state.studio);
  const title = useAdminStore((state) => state.title);
  const onPageChange = useAdminStore((state) => state.onPageChange);

  const handlers = useMemo(() => {
    return {
      onPrevious: () => {
        const newPage = page - 2;
        const previousUrl = generateAlbumsUrl({
          artist,
          direction,
          page: newPage,
          perPage,
          sort,
          studio,
          title,
        });

        if (newPage !== 0) {
          prefetch(previousUrl);
        }

        onPageChange(page - 1);
      },
      onNext: () => {
        const nextUrl = generateAlbumsUrl({
          artist,
          direction,
          page: page + 2,
          perPage,
          sort,
          studio,
          title,
        });
        prefetch(nextUrl);

        onPageChange(page + 1);
      },
    };
  }, [
    artist,
    direction,
    page,
    perPage,
    prefetch,
    sort,
    studio,
    title,
    onPageChange,
  ]);

  return { handlers, page, onPageChange };
}

export function usePerPage() {
  return useAdminStore(
    ({ perPage, onPerPageChange }) => ({
      perPage,
      onPerPageChange,
    }),
    shallow,
  );
}

export function useStudioFilter() {
  return useAdminStore(
    ({ studio, onFilter }) => ({
      studio,
      onFilter,
    }),
    shallow,
  );
}
