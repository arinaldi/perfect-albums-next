'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import useDebounce from 'hooks/useDebounce';
import { SORT_VALUE } from 'utils/constants';
import { parseQuery } from 'utils';
import ClearButton from 'app/admin/ClearButton';
import InputSpinner from 'app/admin/InputSpinner';

export default function SearchArtist() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const artist = parseQuery(searchParams?.get('artist'));
  const [isPending, startTransition] = useTransition();
  const artistRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(artist);
  const debouncedValue = useDebounce(value);

  useEffect(() => {
    artistRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!value && debouncedValue) {
      const params = new URLSearchParams(searchParams?.toString() ?? '');

      params.delete('artist');
      params.delete('sort');
      params.set('page', '1');
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
      return;
    }

    if (debouncedValue === artist) return;

    const params = new URLSearchParams(searchParams?.toString() ?? '');

    if (debouncedValue) {
      params.set('artist', debouncedValue);
      params.set('sort', SORT_VALUE.YEAR);
    } else {
      params.delete('artist');
      params.delete('sort');
    }

    params.set('page', '1');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [artist, debouncedValue, pathname, router, searchParams, value]);

  return (
    <div className="relative w-full">
      <input
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
        id="artist-search"
        name="artist"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search artist"
        ref={artistRef}
        type="text"
        value={value}
      />
      {!isPending && artist && (
        <ClearButton
          onClick={() => {
            setValue('');
            artistRef.current?.focus();
          }}
        />
      )}
      {isPending && <InputSpinner />}
    </div>
  );
}
