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
    <div className="flex flex-col items-start gap-2">
      <Button onClick={onClick} variant="outline">
        Get random artist
      </Button>
      <p>{value}</p>
    </div>
  );
}
