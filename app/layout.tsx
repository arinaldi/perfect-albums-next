import 'server-only';
import { GeistSans } from 'geist/font/sans';

import NavBar from '@/components/NavBar';
import TailwindIndicator from '@/components/TailwindIndicator';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from 'lib/utils';
import { createClient } from '@/utils/supabase/server';
import { Children } from '@/utils/types';
import 'styles/globals.css';

export const revalidate = 0;
export const metadata = {
  icons: {
    icon: 'https://fav.farm/🎧',
  },
};

export default async function RootLayout({ children }: Children) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          GeistSans.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar user={user} />
          <main>{children}</main>
          <Toaster position="top-right" richColors />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
