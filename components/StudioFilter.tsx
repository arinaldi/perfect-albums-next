import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'utils/constants';
import { parseQuery } from 'utils';

enum FILTER {
  OFF = 'Off',
  ON = 'On',
}

interface Props {
  prop: FILTER;
}

function Button({ prop }: Props) {
  const router = useRouter();
  const studio = parseQuery(router.query.studio);
  const value = prop === FILTER.ON;

  return (
    <button
      className={`${
        prop === FILTER.OFF ? 'rounded-l-md' : 'rounded-r-md'
      } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
      disabled={studio === value.toString() || (!studio && prop === FILTER.OFF)}
      onClick={() => {
        router.replace(
          {
            pathname: ROUTES_ADMIN.base.href,
            query: { ...router.query, studio: value },
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

export default function StudioFilter() {
  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Studio filter"
    >
      <Button prop={FILTER.OFF} />
      <Button prop={FILTER.ON} />
    </nav>
  );
}
