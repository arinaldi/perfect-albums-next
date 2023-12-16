'use client';
import { useState } from 'react';

import SecondaryButton from 'components/SecondaryButton';

interface Props {
  artists: string[];
}

export default function Random({ artists }: Props) {
  const [value, setValue] = useState('');

  function onClick() {
    const index = Math.floor(Math.random() * artists.length);
    setValue(artists[index]);
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <SecondaryButton label="Get random artist" onClick={onClick} />
      <p>{value}</p>
    </div>
  );
}
