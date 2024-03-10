'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { MobileSheet } from '@/components/MobileSheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useIsClient } from '@/hooks/useIsClient';
import { cn } from '@/lib/utils';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/utils/constants';
import { createClient } from '@/utils/supabase/client';

interface Props {
  user: User | null;
}

export default function NavBar({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const isClient = useIsClient();

  async function signOut() {
    await supabase.auth.signOut();

    if (pathname?.startsWith(ROUTES_ADMIN.base.href)) {
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    router.refresh();
  }

  return (
    <div className="border-b">
      {/* Desktop */}
      <div className="hidden h-14 items-center justify-between px-5 sm:flex xl:px-8">
        <nav className="flex items-center gap-6">
          <Link
            className="font-semibold transition-colors hover:text-primary"
            href="/dashboard"
          >
            Perfect Albums
          </Link>
          {ROUTES.map((r) => (
            <Link
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                !pathname?.startsWith(r.href) ? 'text-muted-foreground' : '',
              )}
              key={r.href}
              href={r.href}
            >
              {r.label}
            </Link>
          ))}
          {user && (
            <Link
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                !pathname?.startsWith(ROUTES_ADMIN.base.href)
                  ? 'text-muted-foreground'
                  : '',
              )}
              href={ROUTES_ADMIN.base.href}
            >
              {ROUTES_ADMIN.base.label}
            </Link>
          )}
        </nav>
        <div>
          {isClient && <ThemeToggle />}
          {user ? (
            <Button onClick={signOut} size="icon" variant="ghost">
              <ExitIcon className="size-4" />
            </Button>
          ) : (
            <Button asChild size="icon" variant="ghost">
              <Link href={ROUTE_HREF.SIGNIN}>
                <EnterIcon className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="grid h-12 grid-cols-3 items-center px-2 sm:hidden">
        <MobileSheet signOut={signOut} user={user} />
        <Link
          className="font-semibold transition-colors hover:text-primary"
          href="/dashboard"
        >
          Perfect Albums
        </Link>
        <div className="text-right">
          {isClient ? <ThemeToggle /> : <div className="size-9" />}
        </div>
      </div>
    </div>
  );
}
