import 'server-only';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import NavBar from '@/components/NavBar';
import TailwindIndicator from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { UserProvider } from '@/components/UserProvider';
import { cn } from 'lib/utils';
import { createClient } from '@/utils/supabase/server';
import { Children } from '@/utils/types';
import 'styles/globals.css';

export const metadata = {
  icons: {
    icon: 'https://fav.farm/🎧',
  },
};

export default async function RootLayout({ children }: Children) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider user={user}>
        <body
          className={cn(
            'min-h-dvh bg-background antialiased',
            GeistSans.className,
            GeistMono.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavBar />
            <main className="isolate">{children}</main>
            <Toaster position="top-right" richColors />
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
