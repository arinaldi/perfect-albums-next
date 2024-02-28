'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowDownIcon } from '@radix-ui/react-icons';

import { parseQuery } from 'utils';
import { ROUTES_ADMIN } from 'utils/constants';
import { Children } from 'utils/types';
import { TableHead } from 'components/ui/table';

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

  const query = new URLSearchParams(searchParams?.toString());
  query.set('sort', newSort as string);

  return (
    <TableHead
      className={`cursor-pointer font-extrabold ${wrapperClassName}`}
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
          className={`${sortProp === prop ? '' : 'invisible'} ml-1 flex-none`}
        >
          <ArrowDownIcon
            aria-hidden="true"
            className={`${desc ? 'rotate-180' : ''} inline size-4`}
          />
        </span>
      </Link>
    </TableHead>
  );
}
