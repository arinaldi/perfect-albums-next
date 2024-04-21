'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  DotsVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

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
          <DotsVerticalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link
          href={`${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`}
        >
          <DropdownMenuItem className="flex items-center gap-2">
            <Pencil1Icon className="size-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <Link
          href={`${ROUTES_ADMIN.delete.href}/${id}?${searchParams?.toString()}`}
        >
          <DropdownMenuItem className="flex items-center gap-2">
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
