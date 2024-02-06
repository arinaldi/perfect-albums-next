'use client';
import { useReducer } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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
import { useIsClient } from 'hooks/useIsClient';
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
  const { setTheme, theme } = useTheme();
  const isClient = useIsClient();
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
                className={cn('size-6', open ? 'hidden' : 'block')}
              />
              <Cross1Icon className={cn('size-6', open ? 'block' : 'hidden')} />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link
                className="text-lg font-semibold text-white"
                href="/dashboard"
              >
                Perfect albums
              </Link>
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
          {isClient ? (
            <button
              className="rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none dark:hover:bg-gray-800"
              aria-expanded="false"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              type="button"
            >
              <span className="sr-only">Toggle dark mode</span>
              {theme === 'dark' ? (
                <SunIcon className="size-5" />
              ) : (
                <MoonIcon className="size-5" />
              )}
            </button>
          ) : (
            <button className="invisible p-2">
              <SunIcon className="size-5" />
            </button>
          )}
          <div className="absolute inset-y-0 right-0 hidden pr-2 sm:static sm:inset-auto sm:ml-0 sm:flex sm:items-center sm:pr-0">
            {user ? (
              <div
                onClick={signOut}
                className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              >
                <ExitIcon className="size-5" />
              </div>
            ) : (
              <div
                className="cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
                onClick={() => router.push(ROUTE_HREF.SIGNIN)}
              >
                <EnterIcon className="size-5" />
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
                Sign out
              </div>
            </>
          ) : (
            <LinkWrapper
              classNames="block text-base"
              href={ROUTE_HREF.SIGNIN}
              onClick={() => toggle(false)}
            >
              Sign in
            </LinkWrapper>
          )}
        </div>
      </div>
    </nav>
  );
}
