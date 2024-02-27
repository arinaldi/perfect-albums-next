'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES_ADMIN } from 'utils/constants';
import { Button } from 'components/ui/button';

export default function AddAlbumButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Button
      onClick={() => {
        router.push(`${ROUTES_ADMIN.create.href}?${searchParams?.toString()}`);
      }}
      type="button"
    >
      Add album
    </Button>
  );
}
