import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTES, ROUTES_ADMIN } from 'constants/index';
import { useAuth } from 'hooks/useAuth';
import useDarkMode from 'hooks/useDarkMode';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from 'components/Icons';

const NavBar: FC = () => {
  const router = useRouter();
  const { pathname } = router;
  const { hasAuth, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(isOpen => !isOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
              <CloseIcon
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl text-white">Perfect Albums</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {ROUTES.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    <a
                      className={`${
                        pathname === href
                          ? 'text-white font-semibold'
                          : 'text-gray-300 font-medium'
                      } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md dark:hover:bg-gray-800`}
                    >
                      {label}
                    </a>
                  </Link>
                ))}
                {hasAuth && (
                  <Link href={ROUTES_ADMIN.base.href}>
                    <a
                      className={`${
                        pathname === ROUTES_ADMIN.base.href
                          ? 'text-white font-semibold'
                          : 'text-gray-300 font-medium'
                      } hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md dark:hover:bg-gray-800`}
                    >
                      {ROUTES_ADMIN.base.label}
                    </a>
                  </Link>
                )}
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
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
          <div className="hidden absolute inset-y-0 right-0 sm:flex sm:items-center pr-2 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
            {hasAuth ? (
              <div
                onClick={logout}
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium dark:hover:bg-gray-800"
              >
                Sign Out
              </div>
            ) : (
              <Link href="/signin">
                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium dark:hover:bg-gray-800">
                  Sign In
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {ROUTES.map(({ href, label }) => (
            <Link key={href} href={href}>
              <a
                className={`${
                  pathname === href
                    ? 'text-white font-semibold'
                    : 'text-gray-300 font-medium'
                } hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </Link>
          ))}
          {hasAuth ? (
            <>
              <Link href={ROUTES_ADMIN.base.href}>
                <a
                  className={`${
                    pathname === ROUTES_ADMIN.base.href
                      ? 'text-white font-semibold'
                      : 'text-gray-300 font-medium'
                  } hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base`}
                  onClick={closeMenu}
                >
                  {ROUTES_ADMIN.base.label}
                </a>
              </Link>
              <div
                onClick={() => {
                  closeMenu();
                  logout();
                }}
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Out
              </div>
            </>
          ) : (
            <Link href="/signin">
              <a
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                Sign In
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
