'use client';

import { useEffect } from 'react';

import Button from 'components/Button';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error); // eslint-disable-line
  }, [error]);

  return (
    <div className="dark:text-white">
      <p className="mb-4">Something went wrong!</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
