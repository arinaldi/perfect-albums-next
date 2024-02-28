'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { ROUTES_ADMIN } from 'utils/constants';
import { Button } from 'components/ui/button';

interface Props {
  id: number;
}

export default function AlbumActions({ id }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        onClick={() => {
          router.push(
            `${ROUTES_ADMIN.edit.href}/${id}?${searchParams?.toString()}`,
          );
        }}
        size="icon"
        variant="outline"
      >
        <Pencil1Icon className="inline size-4" />
      </Button>
      <Button
        onClick={() => {
          router.push(
            `${ROUTES_ADMIN.delete.href}/${id}?${searchParams?.toString()}`,
          );
        }}
        size="icon"
        variant="outline"
      >
        <TrashIcon className="inline size-4" />
      </Button>
    </div>
  );
}
