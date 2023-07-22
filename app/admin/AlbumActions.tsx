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
    <>
      <span className="cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
        <Pencil1Icon
          className="inline h-6 w-6 p-1"
          onClick={() => {
            router.push(
              `${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`,
            );
          }}
        />
      </span>
      <span className="ml-2 cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
        <TrashIcon
          className="inline h-6 w-6 p-1"
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
