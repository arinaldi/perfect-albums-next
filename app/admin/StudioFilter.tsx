'use client';
import { startTransition, useOptimistic } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Label } from 'components/ui/label';
import { Switch } from 'components/ui/switch';

interface Props {
  studio: string;
}

export default function StudioFilter({ studio }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [optimisticStudio, setOptimisticStudio] = useOptimistic(studio);

  function onCheckedChange(value: boolean) {
    const newValue = value.toString();
    const query = new URLSearchParams(searchParams?.toString());
    query.set('page', '1');
    query.set('studio', newValue);

    startTransition(() => {
      setOptimisticStudio(newValue);
      router.push(`?${query.toString()}`);
    });
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={optimisticStudio === 'true'}
        id="studio-filter"
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="studio-filter">Studio albums</Label>
    </div>
  );
}
