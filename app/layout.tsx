import 'server-only';
import { Inter } from 'next/font/google';

import NavBar from 'components/NavBar';
import TailwindIndicator from 'components/TailwindIndicator';
import Toast from 'components/Toast';
import { createServerClient } from 'utils/supabase-server';
import { Children } from 'utils/types';
import 'styles/globals.css';
import 'styles/nprogress.css';

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
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50/25 antialiased dark:bg-gray-800">
        <NavBar user={session?.user} />
        <TailwindIndicator />
        <Toast />
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
