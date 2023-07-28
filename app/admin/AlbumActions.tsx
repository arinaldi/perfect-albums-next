'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { ROUTES_ADMIN } from 'utils/constants';

interface Props {
  id: number;
}

export default function AlbumActions({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2">
      <span className="cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
        <Pencil1Icon
          className="inline h-6 w-6 p-1"
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`,
            );
          }}
        />
      </span>
      <span className="cursor-pointer hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
        <TrashIcon
          className="inline h-6 w-6 p-1"
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.delete.href}/${id}?${searchParams?.toString()}`,
            );
          }}
        />
      </span>
    </div>
  );
}
