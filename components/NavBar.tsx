import { useState } from 'react';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/outline';

import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from 'constants/index';
import useAuthStore from 'hooks/useAuthStore';
import useDarkMode from 'hooks/useDarkMode';
import LinkWrapper from 'components/LinkWrapper';

export default function NavBar() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-700">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl text-white font-semibold">
                Perfect Albums
              </span>
            </div>
            <div className="hidden sm:block sm:ml-6">
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
            className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
            onClick={toggleDarkMode}
            type="button"
          >
            <span className="sr-only">Toggle dark mode</span>
            {isDarkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
          <div className="hidden absolute inset-y-0 right-0 sm:flex sm:items-center pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
            {user ? (
              <div
                onClick={signOut}
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium dark:hover:bg-gray-800"
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
        <div className="px-2 pt-2 pb-3 space-y-1">
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
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
