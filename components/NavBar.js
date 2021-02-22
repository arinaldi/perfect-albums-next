import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DISPATCH_TYPES } from 'constants/index';
import { useApp } from 'components/Provider';

const ROUTES = [
  { href: '/top-albums', label: 'Top Albums' },
  // { href: '/perfect-songs', label: 'Perfect Songs' },
  { href: '/featured-songs', label: 'Featured Songs' },
  { href: '/new-releases', label: 'New Releases' },
];

export default function NavBar() {
  const router = useRouter();
  const [state, dispatch] = useApp();
  const {
    isLoading,
    user: { isAuthenticated },
  } = state;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleSignout() {
    dispatch({
      type: DISPATCH_TYPES.SIGN_OUT_USER,
    });

    if (router.pathname.startsWith('/admin')) {
      router.push('/top-albums');
    }
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(open => !open)}
              type="button"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
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
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium">
                      {label}
                    </a>
                  </Link>
                ))}
                {isAuthenticated && !isLoading && (
                  <Link href="/admin">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium">
                      Admin
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated && !isLoading ? (
              <div
                onClick={handleSignout}
                className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
              >
                Sign Out
              </div>
            ) : (
              <Link href="/signin">
                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium">
                  Sign In
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {ROUTES.map(({ href, label }) => (
            <Link key={href} href={href}>
              <a
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                {label}
              </a>
            </Link>
          ))}
          {isAuthenticated && !isLoading && (
            <Link href="/admin">
              <a
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={closeMenu}
              >
                Admin
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
