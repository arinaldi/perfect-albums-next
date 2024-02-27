'use client';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DEBOUNCE_IN_MS, SORT_VALUE } from 'utils/constants';
import { parseQuery } from 'utils';
import { Input } from 'components/ui/input';
import ClearButton from './ClearButton';
import InputSpinner from './InputSpinner';

interface Props {
  autoFocus?: boolean;
  type: 'artist' | 'title';
}

export default function Search({ autoFocus, type }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = parseQuery(searchParams?.get(type));
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const isSearching = Boolean(timeoutId) || isPending;

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value) {
        params.set(type, value);
        params.set('sort', SORT_VALUE.YEAR);
      } else {
        params.delete(type);
        params.delete('sort');
      }

      params.set('page', '1');
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });

      setTimeoutId(undefined);
    }, DEBOUNCE_IN_MS);

    setTimeoutId(id);
  }

  function onClear() {
    const params = new URLSearchParams(searchParams?.toString());

    params.delete(type);
    params.delete('sort');
    params.set('page', '1');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });

    if (inputRef?.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  return (
    <div className="relative w-full">
      <Input
        autoFocus={autoFocus}
        defaultValue={query}
        id={`${type}-search`}
        name={type}
        onChange={onSearch}
        placeholder={`Search ${type}`}
        ref={inputRef}
      />
      {!isSearching && query && <ClearButton onClick={onClear} />}
      {isSearching && <InputSpinner />}
    </div>
  );
}
