'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

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
        <Pencil className="inline size-4" />
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
        <Trash2 className="inline size-4" />
      </Button>
    </div>
  );
}
