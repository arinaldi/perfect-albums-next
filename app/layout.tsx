import 'server-only';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

import NavBar from 'components/NavBar';
import TailwindIndicator from 'components/TailwindIndicator';
import { ThemeProvider } from 'components/ThemeProvider';
import { Toaster } from 'components/ui/toaster';
import { cn } from 'lib/utils';
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          inter.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar user={user} />
          <TailwindIndicator />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
