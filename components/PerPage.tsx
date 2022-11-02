import { useRouter } from 'next/router';

import { PER_PAGE, ROUTES_ADMIN } from 'utils/constants';
import { parsePerPageQuery } from 'utils';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

interface Props {
  prop: PER_PAGE;
}

function Button({ prop }: Props) {
  const router = useRouter();
  const perPage = parsePerPageQuery(router.query.perPage);

  return (
    <button
      className={`${prop === SMALL ? 'rounded-l-md' : ''} ${
        prop === LARGE ? 'rounded-r-md' : ''
      } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
      disabled={perPage === prop}
      onClick={() => {
        router.replace(
          {
            pathname: ROUTES_ADMIN.base.href,
            query: {
              ...router.query,
              page: 1,
              perPage: prop,
            },
          },
          undefined,
          { shallow: true },
        );
      }}
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
      <Button prop={SMALL} />
      <Button prop={MEDIUM} />
      <Button prop={LARGE} />
    </nav>
  );
}
