'use client';
import { useSearchParams } from 'next/navigation';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { parsePageQuery, parsePerPageQuery } from 'utils';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'components/ui/pagination';

interface Props {
  total: number;
}

export default function Paginate({ total }: Props) {
  const searchParams = useSearchParams();
  const page = parsePageQuery(searchParams?.get('page'));
  const perPage = parsePerPageQuery(searchParams?.get('perPage'));
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  function getHref(pageValue: number) {
    const query = new URLSearchParams(searchParams ?? '');
    query.set('page', pageValue.toString());

    return `?${query.toString()}`;
  }

  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isFirstPage}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            href={getHref(1)}
          >
            <ChevronsLeft className="size-4" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={isFirstPage}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            href={getHref(page - 1)}
          />
        </PaginationItem>
        <PaginationItem className="px-2 text-sm font-medium transition-colors">
          {page.toLocaleString()}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={isLastPage}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            href={getHref(page + 1)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            aria-disabled={isLastPage}
            className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            href={getHref(lastPage)}
          >
            <ChevronsRight className="size-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
