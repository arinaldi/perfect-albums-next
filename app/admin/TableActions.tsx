'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { ROUTES_ADMIN } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  id: number;
}

export default function TableActions({ id }: Props) {
  const searchParams = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href={`${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`}
        >
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <Link
          href={`${ROUTES_ADMIN.delete.href}/${id}?${searchParams?.toString()}`}
        >
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
