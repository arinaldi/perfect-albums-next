import 'server-only';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import NavBar from 'components/NavBar';
import TailwindIndicator from 'components/TailwindIndicator';
import { createClient } from 'utils/supabase/server';
import { Children } from 'utils/types';
import 'styles/globals.css';

export const revalidate = 0;
export const metadata = {
  icons: {
    icon: 'https://fav.farm/🎧',
  },
};

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

export default async function RootLayout({ children }: Children) {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-800">
        <NavBar user={session?.user} />
        <TailwindIndicator />
        <Toaster
          toastOptions={{
            className: 'dark:bg-gray-700 dark:text-white',
            position: 'bottom-center',
          }}
        />
        <main>{children}</main>
        <script
          id="dark-mode"
          dangerouslySetInnerHTML={{
            __html: `
            const root = window.document.documentElement;
            const prefersDark = !('theme' in localStorage) &&
              window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (localStorage.theme === 'dark' || prefersDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          `,
          }}
        />
      </body>
    </html>
  );
}
