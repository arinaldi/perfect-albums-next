import { useState } from 'react';
import { useRouter } from 'next/router';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline';

import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from 'constants/index';
import { useUser } from 'hooks/useStore';
import useDarkMode from 'hooks/useDarkMode';
import supabase from 'utils/supabase';
import LinkWrapper from 'components/LinkWrapper';

export default function NavBar() {
  const user = useUser();
  const router = useRouter();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  async function signOut() {
    await supabase.auth.signOut();

    if (router.pathname.startsWith(ROUTES_ADMIN.base.href)) {
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-700">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              onClick={toggleMenu}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              />
              <XIcon className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} />
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
            className="rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                className="text-md cursor-pointer rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800"
              >
                Sign Out
              </div>
            ) : (
              <LinkWrapper href={ROUTE_HREF.SIGNIN}>Sign In</LinkWrapper>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="space-y-1 px-2 pt-2 pb-3">
          {ROUTES.map(({ href, label }) => (
            <LinkWrapper
              key={href}
              classNames="block text-base"
              href={href}
              onClick={closeMenu}
            >
              {label}
            </LinkWrapper>
          ))}
          {user ? (
            <>
              <LinkWrapper
                classNames="block text-base"
                href={ROUTES_ADMIN.base.href}
                onClick={closeMenu}
              >
                {ROUTES_ADMIN.base.label}
              </LinkWrapper>
              <div
                onClick={() => {
                  closeMenu();
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
              onClick={closeMenu}
            >
              Sign In
            </LinkWrapper>
          )}
        </div>
      </div>
    </nav>
  );
}
