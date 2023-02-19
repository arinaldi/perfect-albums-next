'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PlusSmallIcon } from '@heroicons/react/24/outline';

import { ROUTES_ADMIN } from 'utils/constants';
import ButtonWithIcon from 'components/ButtonWithIcon';

export default function NewAlbumButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <ButtonWithIcon
      icon={<PlusSmallIcon />}
      onClick={() => {
        router.push(`${ROUTES_ADMIN.create.href}?${searchParams?.toString()}`);
      }}
    >
      New
    </ButtonWithIcon>
  );
}
