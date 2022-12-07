'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { PER_PAGE, ROUTES_ADMIN } from 'utils/constants';
import { parsePerPageQuery } from 'utils';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

interface Props {
  prop: PER_PAGE;
}

function PerPageButton({ prop }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = parsePerPageQuery(searchParams.get('perPage'));

  function onClick() {
    const query = new URLSearchParams(searchParams);
    query.set('page', '1');
    query.set('perPage', prop.toString());

    router.replace(`${ROUTES_ADMIN.base.href}?${query.toString()}`);
  }

  return (
    <button
      className={`${prop === SMALL ? 'rounded-l-md' : ''} ${
        prop === LARGE ? 'rounded-r-md' : ''
      } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
      disabled={perPage === prop}
      onClick={onClick}
    >
      <span className="sr-only">{prop}</span>
      {prop}
    </button>
  );
}

export default function PerPage() {
  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <PerPageButton prop={SMALL} />
      <PerPageButton prop={MEDIUM} />
      <PerPageButton prop={LARGE} />
    </nav>
  );
}
