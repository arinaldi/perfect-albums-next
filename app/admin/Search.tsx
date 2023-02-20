'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { SORT_VALUE } from 'utils/constants';
import { parseQuery } from 'utils';
import Spinner from 'components/Spinner';

type InputName = 'artist' | 'title';

export default function Search() {
  const [focused, setFocused] = useState<InputName | null>('artist');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const artistQuery = parseQuery(searchParams?.get('artist'));
  const titleQuery = parseQuery(searchParams?.get('title'));
  const [isPending, startTransition] = useTransition();
  const artistRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    artistRef?.current?.focus();
  }, []);

  function onSearch(name: InputName, value: string) {
    const params = new URLSearchParams(searchParams ?? '');

    if (value) {
      params.set(name, value);
      params.set('page', '1');
      params.set('sort', SORT_VALUE.YEAR);
    } else {
      params.delete(name);
      params.delete('sort');
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <>
      <div className="relative w-full">
        <input
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          defaultValue={artistQuery}
          id="artist-search"
          name="artist"
          onBlur={() => setFocused(null)}
          onChange={(event) => {
            onSearch('artist', event.target.value);
          }}
          onFocus={() => setFocused('artist')}
          placeholder="Search artist"
          ref={artistRef}
          type="text"
        />
        {!isPending && artistQuery ? (
          <ClearButton
            onClick={() => {
              onSearch('artist', '');

              if (artistRef?.current) {
                artistRef.current.value = '';
                artistRef.current.focus();
              }
            }}
          />
        ) : null}
        {isPending && focused === 'artist' ? <InputSpinner /> : null}
      </div>

      <div className="relative mt-2 w-full sm:ml-4 sm:mt-0">
        <input
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          defaultValue={titleQuery}
          id="title-search"
          name="title"
          onBlur={() => setFocused(null)}
          onChange={(event) => {
            onSearch('title', event.target.value);
          }}
          onFocus={() => setFocused('title')}
          placeholder="Search title"
          ref={titleRef}
          type="text"
        />
        {!isPending && titleQuery ? (
          <ClearButton
            onClick={() => {
              onSearch('title', '');

              if (titleRef?.current) {
                titleRef.current.value = '';
                titleRef.current.focus();
              }
            }}
          />
        ) : null}
        {isPending && focused === 'title' ? <InputSpinner /> : null}
      </div>
    </>
  );
}

function InputSpinner() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <Spinner className="mr-1.5 h-6 w-6 cursor-none p-1" />
    </div>
  );
}

interface ButtonProps {
  onClick: () => void;
}

function ClearButton({ onClick }: ButtonProps) {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <span className="mr-1.5 h-6 w-6 cursor-pointer rounded-full p-1 transition hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900">
        <XMarkIcon onClick={onClick} />
      </span>
    </div>
  );
}
