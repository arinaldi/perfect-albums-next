'use client';

import AppMessage from 'components/AppMessage';

interface Props {
  error: any;
  reset: () => void;
}

export default function Error({ error }: Props) {
  return <AppMessage message={error?.message} />;
}
