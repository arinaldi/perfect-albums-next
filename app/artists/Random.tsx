'use client';
import { useState } from 'react';

import { Button } from 'components/ui/button';

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
    <div className="flex items-center gap-4">
      <Button onClick={onClick} variant="outline">
        Shuffle
      </Button>
      <p className="text-sm">{value}</p>
    </div>
  );
}
