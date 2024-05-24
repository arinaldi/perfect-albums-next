'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type User } from '@supabase/supabase-js';
import { EnterIcon, ExitIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import CommandMenu from '@/components/CommandMenu';
import { MobileSheet } from '@/components/MobileSheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useIsClient } from '@/hooks/is-client';
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
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (pathname?.startsWith(ROUTES_ADMIN.base.href)) {
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    router.refresh();
  }

  return (
    <div className="fixed top-0 z-10 w-full border-b bg-background">
      {/* Desktop */}
      <div className="hidden h-14 items-center justify-between px-5 sm:flex xl:px-8">
        <nav className="flex items-center gap-6">
          <Link
            className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
            href={ROUTE_HREF.DASHBOARD}
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
        <div className="flex items-center gap-0.5">
          {isClient && (
            <>
              <CommandMenu user={user} />
              <ThemeToggle />
            </>
          )}
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
      <div className="flex h-12 items-center justify-between px-2 sm:hidden">
        <MobileSheet signOut={signOut} user={user} />
        <Link
          className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
          href={ROUTE_HREF.DASHBOARD}
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
