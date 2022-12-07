'use client';

import OutlineButton from 'components/OutlineButton';
import { ErrorProps } from 'utils/types';

export default function ErrorMessage({ error, reset }: ErrorProps) {
  return (
    <div className="dark:text-white">
      <p className="mb-4">{error.message ?? 'Something went wrong'}</p>
      <OutlineButton onClick={reset}>Reset</OutlineButton>
    </div>
  );
}
