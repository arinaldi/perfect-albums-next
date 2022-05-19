import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'constants/index';
import { parseQuery } from 'utils';

interface Props {
  prop: 'On' | 'Off';
}

function Button({ prop }: Props) {
  const router = useRouter();
  const studio = parseQuery(router.query.studio);
  const value = prop === 'On';

  return (
    <button
      className={`${
        prop === 'Off' ? 'rounded-l-md' : 'rounded-r-md'
      } relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white`}
      disabled={studio === value.toString() || (!studio && prop === 'Off')}
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
      <Button prop="Off" />
      <Button prop="On" />
    </nav>
  );
}
