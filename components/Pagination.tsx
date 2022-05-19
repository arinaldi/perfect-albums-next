import { useRouter } from 'next/router';

import { ROUTES_ADMIN, SORT_DIRECTION } from 'constants/index';
import usePrefetch from 'hooks/usePrefetch';
import { generateAlbumsUrl, parseAdminQuery } from 'utils';
import { Children } from 'utils/types';

interface PaginationProps {
  lastPage: number;
}

interface ButtonProps extends Children {
  isDisabled: boolean;
  label: 'First page' | 'Previous page' | 'Next page' | 'Last page';
  pageValue: number;
  prefetch?: () => void;
}

function Button({
  children,
  isDisabled,
  label,
  pageValue,
  prefetch,
}: ButtonProps) {
  const router = useRouter();

  function onClick() {
    if (prefetch) prefetch();

    router.replace(
      {
        pathname: ROUTES_ADMIN.base.href,
        query: { ...router.query, page: pageValue },
      },
      undefined,
      { shallow: true },
    );
  }

  return (
    <button
      className={`${label === 'First page' ? 'rounded-l-md' : ''} ${
        label === 'Last page' ? 'rounded-r-md' : ''
      } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}

export default function Pagination({ lastPage }: PaginationProps) {
  const router = useRouter();
  const prefetch = usePrefetch();
  const { artist, page, perPage, sort, studio, title } = parseAdminQuery(
    router.query,
  );
  const [sortProp, desc] = sort.split(':') ?? [];
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  function onPrevious() {
    const newPage = page - 2;
    const url = generateAlbumsUrl({
      artist,
      direction: desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
      page: newPage,
      perPage,
      sort: sortProp,
      studio,
      title,
    });

    if (newPage !== 0) {
      prefetch(url);
    }
  }

  function onNext() {
    const url = generateAlbumsUrl({
      artist,
      direction: desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC,
      page: page + 2,
      perPage,
      sort: sortProp,
      studio,
      title,
    });

    prefetch(url);
  }

  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <Button isDisabled={isFirstPage} label="First page" pageValue={1}>
        «
      </Button>
      <Button
        isDisabled={isFirstPage}
        label="Previous page"
        pageValue={page - 1}
        prefetch={onPrevious}
      >
        ‹
      </Button>
      <span className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-black dark:bg-gray-700 dark:text-white">
        {page}
      </span>
      <Button
        isDisabled={isLastPage}
        label="Next page"
        pageValue={page + 1}
        prefetch={onNext}
      >
        ›
      </Button>
      <Button isDisabled={isLastPage} label="Last page" pageValue={lastPage}>
        »
      </Button>
    </nav>
  );
}
