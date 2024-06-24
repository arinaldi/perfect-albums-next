'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRightIcon } from '@radix-ui/react-icons';

import { ROUTES_ADMIN } from '@/utils/constants';
import { Button } from '@/components/ui/button';

interface Props {
  id: number;
}

export default function TableLink({ id }: Props) {
  const searchParams = useSearchParams();

  return (
    <Button asChild className="size-8 p-0" variant="ghost">
      <Link
        href={`${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`}
      >
        <ChevronRightIcon className="size-4" />
      </Link>
    </Button>
  );
}
