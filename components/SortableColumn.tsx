import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowNarrowDownIcon } from '@heroicons/react/outline';

import { parseQuery } from 'utils';
import { Children } from 'utils/types';

interface Props extends Children {
  prop: string;
}

export default function SortableColumn({ children, prop }: Props) {
  const { query } = useRouter();
  const sort = parseQuery(query.sort);
  let [sortProp, desc] = sort.split(':') ?? [];
  let newSort = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  const newSearchParams = new URLSearchParams({
    ...query,
    sort: newSort as string,
  });

  return (
    <th
      className="cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white sm:w-1/4"
      scope="col"
    >
      <Link
        href={newSort ? `?${newSearchParams}` : '/admin'}
        passHref
        replace
        shallow
      >
        <a>
          {children}
          <span
            className={`${
              sortProp === prop
                ? 'text-gray-700 group-hover:bg-gray-300'
                : 'invisible text-gray-400 group-hover:visible'
            } ml-1 flex-none`}
          >
            <ArrowNarrowDownIcon
              aria-hidden="true"
              className={`${desc ? 'rotate-180' : ''} inline h-4 w-4`}
            />
          </span>
        </a>
      </Link>
    </th>
  );
}
