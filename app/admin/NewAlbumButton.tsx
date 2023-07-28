'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES_ADMIN } from 'utils/constants';
import SecondaryButton from 'components/SecondaryButton';

export default function NewAlbumButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SecondaryButton
      label="New"
      onClick={() => {
        router.push(`${ROUTES_ADMIN.create.href}?${searchParams?.toString()}`);
      }}
    />
  );
}
