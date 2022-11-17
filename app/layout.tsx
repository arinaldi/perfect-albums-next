import 'server-only';
import { cookies, headers } from 'next/headers';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';

import NavBar from 'app/components/NavBar';
import SupabaseListener from 'app/components/SupabaseListener';
import Toast from 'app/components/Toast';
import { Children } from 'utils/types';
import 'styles/globals.css';
import 'styles/nprogress.css';

export default async function RootLayout({ children }: Children) {
  const supabase = createServerComponentSupabaseClient({ cookies, headers });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <body className="min-h-screen dark:bg-gray-800">
        <SupabaseListener accessToken={session?.access_token} />
        <NavBar user={session?.user} />
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
