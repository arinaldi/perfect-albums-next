'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowDownIcon } from '@radix-ui/react-icons';

import { parseQuery } from 'utils';
import { ROUTES_ADMIN } from 'utils/constants';
import { Children } from 'utils/types';

interface Props extends Children {
  prop: string;
  wrapperClassName?: string;
}

export default function SortableColumn({
  children,
  prop,
  wrapperClassName = '',
}: Props) {
  const searchParams = useSearchParams();
  const sort = parseQuery(searchParams?.get('sort'));
  let [sortProp, desc] = sort.split(':') ?? [];
  let newSort = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  const query = new URLSearchParams(searchParams?.toString() ?? '');
  query.set('sort', newSort as string);

  return (
    <th
      className={`cursor-pointer px-3 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-gray-700 dark:text-white ${wrapperClassName}`}
      scope="col"
    >
      <Link
        href={
          newSort
            ? `${ROUTES_ADMIN.base.href}?${query.toString()}`
            : ROUTES_ADMIN.base.href
        }
        passHref
        replace
        shallow
      >
        {children}
        <span
          className={`${
            sortProp === prop
              ? 'text-gray-700 group-hover:bg-gray-300'
              : 'invisible text-gray-400 group-hover:visible'
          } ml-1 flex-none`}
        >
          <ArrowDownIcon
            aria-hidden="true"
            className={`${desc ? 'rotate-180' : ''} inline h-4 w-4`}
          />
        </span>
      </Link>
    </th>
  );
}
