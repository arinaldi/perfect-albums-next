'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDebounce from '@/hooks/useDebounce';
import { SORT_VALUE } from 'utils/constants';
import { parseQuery } from 'utils';
import ClearButton from 'app/admin/ClearButton';
import InputSpinner from 'app/admin/InputSpinner';

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = parseQuery(searchParams?.get('title'));
  const [isPending, startTransition] = useTransition();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(title);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (!value && debouncedValue) {
      const params = new URLSearchParams(searchParams?.toString() ?? '');

      params.delete('title');
      params.delete('sort');
      params.set('page', '1');
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
      return;
    }

    if (debouncedValue === title) return;

    const params = new URLSearchParams(searchParams?.toString() ?? '');

    if (debouncedValue) {
      params.set('title', debouncedValue);
      params.set('sort', SORT_VALUE.YEAR);
    } else {
      params.delete('title');
      params.delete('sort');
    }

    params.set('page', '1');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [debouncedValue, pathname, router, searchParams, title, value]);

  return (
    <div className="relative mt-2 w-full sm:ml-4 sm:mt-0">
      <input
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
        id="title-search"
        name="title"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search title"
        ref={titleRef}
        type="text"
        value={value}
      />
      {!isPending && title && (
        <ClearButton
          onClick={() => {
            setValue('');
            titleRef?.current?.focus();
          }}
        />
      )}
      {isPending && <InputSpinner />}
    </div>
  );
}
