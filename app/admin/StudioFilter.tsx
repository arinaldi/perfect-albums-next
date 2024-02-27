'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { Label } from 'components/ui/label';
import { Switch } from 'components/ui/switch';
import { parseQuery } from 'utils';

export default function StudioFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studio = parseQuery(searchParams?.get('studio')) || 'false';

  function onCheckedChange(value: boolean) {
    const query = new URLSearchParams(searchParams?.toString());
    query.set('page', '1');
    query.set('studio', value.toString());

    router.push(`?${query.toString()}`);
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={studio === 'true'}
        id="studio-filter"
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="studio-filter">Studio albums</Label>
    </div>
  );
}
