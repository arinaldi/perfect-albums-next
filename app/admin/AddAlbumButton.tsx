'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { ROUTES_ADMIN } from 'utils/constants';
import PrimaryButton from 'components/PrimaryButton';

export default function AddAlbumButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <PrimaryButton
      label="Add album"
      onClick={() => {
        router.push(`${ROUTES_ADMIN.create.href}?${searchParams?.toString()}`);
      }}
      type="button"
    />
  );
}
