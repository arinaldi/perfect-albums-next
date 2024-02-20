import 'server-only';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

import NavBar from 'components/NavBar';
import TailwindIndicator from 'components/TailwindIndicator';
import { ThemeProvider } from 'components/ThemeProvider';
import { ToastProvider } from 'components/Toast';
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
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-gray-800">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <NavBar user={user} />
            <TailwindIndicator />
            <main>{children}</main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
