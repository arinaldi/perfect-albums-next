'use client';

import { useState } from 'react';

import OutlineButton from 'components/OutlineButton';

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
      <OutlineButton onClick={onClick}>Get Random Artist</OutlineButton>
      <p>{value}</p>
    </div>
  );
}
