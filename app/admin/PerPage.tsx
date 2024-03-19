'use client';
import { startTransition, useOptimistic } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { PER_PAGE } from 'utils/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  perPage: PER_PAGE;
}

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage({ perPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticPerPage, setOptimisticPerPage] = useOptimistic(
    perPage.toString(),
  );

  function onValueChange(value: string) {
    const query = new URLSearchParams(searchParams?.toString());
    query.set('page', '1');
    query.set('perPage', value);

    startTransition(() => {
      setOptimisticPerPage(value);
      router.push(`?${query.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-x-2">
      <p className="text-sm font-medium">Rows per page</p>
      <Select onValueChange={onValueChange} value={optimisticPerPage}>
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem value={`${SMALL}`}>{SMALL}</SelectItem>
          <SelectItem value={`${MEDIUM}`}>{MEDIUM}</SelectItem>
          <SelectItem value={`${LARGE}`}>{LARGE}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
