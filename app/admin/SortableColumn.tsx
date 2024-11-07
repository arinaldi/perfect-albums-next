'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MoveDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { parseQuery } from 'utils';
import { ROUTES_ADMIN } from '@/utils/constants';
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
  const query = new URLSearchParams(searchParams ?? '');
  const sort = parseQuery(searchParams?.get('sort'));
  let [sortProp, desc] = sort.split(':') ?? [];
  let newSort = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  if (newSort) {
    query.set('sort', newSort);
  } else {
    query.delete('sort');
  }

  return (
    <TableHead
      className={cn(`cursor-pointer font-extrabold`, wrapperClassName)}
      scope="col"
    >
      <Link
        href={
          query ? `${ROUTES_ADMIN.base.href}?${query}` : ROUTES_ADMIN.base.href
        }
        passHref
        replace
        shallow
      >
        {children}
        <span
          className={cn('ml-1 flex-none', sortProp === prop ? '' : 'invisible')}
        >
          <MoveDownIcon
            aria-hidden="true"
            className={cn('inline size-4', desc ? 'rotate-180' : '')}
          />
        </span>
      </Link>
    </TableHead>
  );
}
