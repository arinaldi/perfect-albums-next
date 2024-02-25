import { useState } from 'react';

import { DECADES, ROUTE_HREF } from 'utils/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function DecadeSelect() {
  const [decade, setDecade] = useState('');

  function onChange(value: string) {
    setDecade(value);
    window.location.href = `${ROUTE_HREF.TOP_ALBUMS}#${value}`;
  }

  return (
    <Select onValueChange={onChange} value={decade}>
      <SelectTrigger className="w-28">
        <SelectValue placeholder="Decade" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Decade</SelectLabel>
          {DECADES.map((d) => (
            <SelectItem key={d.id} value={d.id}>
              {d.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
