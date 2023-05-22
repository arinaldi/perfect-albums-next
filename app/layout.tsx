import 'server-only';

import NavBar from 'components/NavBar';
import SupabaseListener from 'components/SupabaseListener';
import TailwindIndicator from 'components/TailwindIndicator';
import Toast from 'components/Toast';
import { cn } from 'utils';
import { fontSans } from 'utils/fonts';
import { createClient } from 'utils/supabase-server';
import { Children } from 'utils/types';
import 'styles/globals.css';
import 'styles/nprogress.css';
import SupabaseProvider from 'components/SupabaseProvider';

export const revalidate = 0;
export const metadata = {
  icons: {
    icon: 'https://fav.farm/🎧',
  },
};

export default async function RootLayout({ children }: Children) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <body
        className={cn(
          'min-h-screen bg-gray-50/25 font-sans antialiased dark:bg-gray-800',
          fontSans.variable,
        )}
      >
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <NavBar user={session?.user} />
          <TailwindIndicator />
          <Toast />
          <main>{children}</main>
        </SupabaseProvider>
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
