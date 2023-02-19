'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ROUTES_ADMIN } from 'utils/constants';

interface Props {
  id: number;
}

export default function AlbumActions({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <span className="cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
        <PencilIcon
          className="inline h-4 w-4"
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`,
            );
          }}
        />
      </span>
      <span className="ml-2 cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
        <TrashIcon
          className="inline h-4 w-4"
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.delete.href}/${id}?${searchParams?.toString()}`,
            );
          }}
        />
      </span>
    </>
  );
}
