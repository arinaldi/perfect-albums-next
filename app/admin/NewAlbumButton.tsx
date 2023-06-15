'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES_ADMIN } from 'utils/constants';
import OutlineButton from 'components/OutlineButton';

export default function NewAlbumButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <OutlineButton
      onClick={() => {
        router.push(`${ROUTES_ADMIN.create.href}?${searchParams?.toString()}`);
      }}
    >
      New
    </OutlineButton>
  );
}
