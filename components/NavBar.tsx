'use client';
import { useReducer } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import {
  Cross1Icon,
  EnterIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';

import LinkWrapper from 'components/LinkWrapper';
import useDarkMode from 'hooks/useDarkMode';
import { cn } from 'utils';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from 'utils/constants';
import { createClient } from 'utils/supabase/client';

interface Props {
  user: User | undefined;
}

export default function NavBar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [open, toggle] = useReducer(
    (flag: boolean, next: boolean | null) => (next == null ? !flag : next),
    false,
  );

  async function signOut() {
    await supabase.auth.signOut();

    if (pathname?.startsWith(ROUTES_ADMIN.base.href)) {
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    router.refresh();
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-700">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
              aria-expanded="false"
              onClick={() => toggle(null)}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerMenuIcon
                className={cn('h-6 w-6', open ? 'hidden' : 'block')}
              />
              <Cross1Icon
                className={cn('h-6 w-6', open ? 'block' : 'hidden')}
              />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-semibold text-white">
                Perfect Albums
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex">
                {ROUTES.map(({ href, label }) => (
                  <LinkWrapper key={href} href={href}>
                    {label}
                  </LinkWrapper>
                ))}
                {user ? (
                  <LinkWrapper href={ROUTES_ADMIN.base.href}>
                    {ROUTES_ADMIN.base.label}
                  </LinkWrapper>
                ) : null}
              </div>
            </div>
          </div>
          <button
            className="rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none dark:hover:bg-gray-800"
            aria-expanded="false"
            onClick={toggleDarkMode}
            type="button"
          >
            <span className="sr-only">Toggle dark mode</span>
            {isDarkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
          <div className="absolute inset-y-0 right-0 hidden pr-2 sm:static sm:inset-auto sm:ml-0 sm:flex sm:items-center sm:pr-0">
            {user ? (
              <div
                onClick={signOut}
                className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              >
                <ExitIcon className="h-5 w-5" />
              </div>
            ) : (
              <div
                className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
                onClick={() => router.push(ROUTE_HREF.SIGNIN)}
              >
                <EnterIcon className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${open ? 'block' : 'hidden'} sm:hidden`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          {ROUTES.map(({ href, label }) => (
            <LinkWrapper
              key={href}
              classNames="block text-base"
              href={href}
              onClick={() => toggle(false)}
            >
              {label}
            </LinkWrapper>
          ))}
          {user ? (
            <>
              <LinkWrapper
                classNames="block text-base"
                href={ROUTES_ADMIN.base.href}
                onClick={() => toggle(false)}
              >
                {ROUTES_ADMIN.base.label}
              </LinkWrapper>
              <div
                onClick={() => {
                  toggle(false);
                  signOut();
                }}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Sign Out
              </div>
            </>
          ) : (
            <LinkWrapper
              classNames="block text-base"
              href={ROUTE_HREF.SIGNIN}
              onClick={() => toggle(false)}
            >
              Sign In
            </LinkWrapper>
          )}
        </div>
      </div>
    </nav>
  );
}
