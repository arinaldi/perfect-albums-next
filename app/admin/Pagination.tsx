'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { parsePageQuery } from 'utils';
import { ROUTES_ADMIN } from 'utils/constants';
import { Children } from 'utils/types';

enum PAGE {
  FIRST = 'First page',
  LAST = 'Last page',
  NEXT = 'Next page',
  PREVIOUS = 'Previous page',
}

interface PaginationProps {
  lastPage: number;
}

interface ButtonProps extends Children {
  isDisabled: boolean;
  label: PAGE;
  pageValue: number;
}

function PaginationButton({
  children,
  isDisabled,
  label,
  pageValue,
}: ButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onClick() {
    const query = new URLSearchParams(searchParams);
    query.set('page', pageValue.toString());

    router.replace(`${ROUTES_ADMIN.base.href}?${query.toString()}`);
  }

  return (
    <button
      className={`${label === PAGE.FIRST ? 'rounded-l-md' : ''} ${
        label === PAGE.LAST ? 'rounded-r-md' : ''
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
  const searchParams = useSearchParams();
  const page = parsePageQuery(searchParams.get('page'));
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <PaginationButton
        isDisabled={isFirstPage}
        label={PAGE.FIRST}
        pageValue={1}
      >
        «
      </PaginationButton>
      <PaginationButton
        isDisabled={isFirstPage}
        label={PAGE.PREVIOUS}
        pageValue={page - 1}
      >
        ‹
      </PaginationButton>
      <span className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-black dark:bg-gray-700 dark:text-white">
        {page}
      </span>
      <PaginationButton
        isDisabled={isLastPage}
        label={PAGE.NEXT}
        pageValue={page + 1}
      >
        ›
      </PaginationButton>
      <PaginationButton
        isDisabled={isLastPage}
        label={PAGE.LAST}
        pageValue={lastPage}
      >
        »
      </PaginationButton>
    </nav>
  );
}
