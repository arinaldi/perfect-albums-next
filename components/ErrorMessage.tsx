'use client';

import Button from 'components/Button';
import { ErrorProps } from 'utils/types';

export default function ErrorMessage({ error, reset }: ErrorProps) {
  return (
    <div className="dark:text-white">
      <p className="mb-4">{error.message ?? 'Something went wrong'}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
