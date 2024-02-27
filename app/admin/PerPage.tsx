'use client';
import { useRouter, useSearchParams } from 'next/navigation';

import { PER_PAGE } from 'utils/constants';
import { parsePerPageQuery } from 'utils';
import { ToggleGroup, ToggleGroupItem } from 'components/ui/toggle-group';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const perPage = parsePerPageQuery(searchParams?.get('perPage')).toString();

  function onValueChange(value: string) {
    const query = new URLSearchParams(searchParams?.toString());
    query.set('page', '1');
    query.set('perPage', value);

    router.push(`?${query.toString()}`);
  }

  return (
    <ToggleGroup onValueChange={onValueChange} type="single" value={perPage}>
      <ToggleGroupItem value={SMALL.toString()} aria-label="Toggle small">
        {SMALL}
      </ToggleGroupItem>
      <ToggleGroupItem value={MEDIUM.toString()} aria-label="Toggle medium">
        {MEDIUM}
      </ToggleGroupItem>
      <ToggleGroupItem value={LARGE.toString()} aria-label="Toggle large">
        {LARGE}
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
