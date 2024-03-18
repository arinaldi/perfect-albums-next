'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';

import { parsePageQuery } from '@/utils';
import { PER_PAGE } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from 'components/ui/pagination';
import { StudioValue } from '@/utils/types';
import PerPage from './PerPage';
import StudioFilter from './StudioFilter';

interface Props {
  perPage: PER_PAGE;
  studio: StudioValue;
  total: number;
}

export default function Paginate({ perPage, studio, total }: Props) {
  const searchParams = useSearchParams();
  const page = parsePageQuery(searchParams?.get('page'));
  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = page === 1;
  const isLastPage = page === lastPage;

  function getHref(pageValue: number) {
    const query = new URLSearchParams(searchParams ?? '');
    query.set('page', pageValue.toString());

    return `?${query.toString()}`;
  }

  return (
    <>
      {/* Desktop version */}
      <Pagination className="hidden sm:flex sm:items-center sm:justify-between sm:gap-8">
        <StudioFilter studio={studio} />
        <div className="flex items-center gap-8">
          <PerPage perPage={perPage} />
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(1)}
                >
                  <span className="sr-only">Go to first page</span>
                  <DoubleArrowLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(page - 1)}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(page + 1)}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(lastPage)}
                >
                  <span className="sr-only">Go to last page</span>
                  <DoubleArrowRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
        </div>
      </Pagination>
      {/* Mobile version */}
      <Pagination className="flex items-center justify-between gap-2 sm:hidden">
        <div className="flex items-center gap-4">
          <PaginationContent className="gap-2">
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isFirstPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(page - 1)}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button asChild size="icon" variant="outline">
                <Link
                  aria-disabled={isLastPage}
                  className="aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  href={getHref(page + 1)}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon className="size-4" />
                </Link>
              </Button>
            </PaginationItem>
          </PaginationContent>
          <p className="text-sm font-medium">
            Page {page.toLocaleString()} of {lastPage.toLocaleString()}
          </p>
        </div>
        <StudioFilter studio={studio} />
      </Pagination>
    </>
  );
}
