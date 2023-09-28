'use client';
import { ChangeEvent, useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { DEBOUNCE_IN_MS, SORT_VALUE } from 'utils/constants';
import { parseQuery } from 'utils';
import ClearButton from 'app/admin/ClearButton';
import InputSpinner from 'app/admin/InputSpinner';

interface Props {
  hasFocus?: boolean;
  type: 'artist' | 'title';
}

export default function Search({ hasFocus, type }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = parseQuery(searchParams?.get(type));
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const isSearching = Boolean(timeoutId) || isPending;

  useEffect(() => {
    if (hasFocus) {
      inputRef?.current?.focus();
    }
  }, [hasFocus]);

  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    clearTimeout(timeoutId);

    const { value } = event.target;
    const id = setTimeout(() => {
      const params = new URLSearchParams(searchParams?.toString() ?? '');

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
    const params = new URLSearchParams(searchParams?.toString() ?? '');

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
      <input
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
        defaultValue={query}
        id={`${type}-search`}
        name={type}
        onChange={onSearch}
        placeholder={`Search ${type}`}
        ref={inputRef}
        type="text"
      />
      {!isSearching && query && <ClearButton onClick={onClear} />}
      {isSearching && <InputSpinner />}
    </div>
  );
}
