'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CommandMenu from '@/components/CommandMenu';
import { MobileSheet } from '@/components/MobileSheet';
import { UserMenu } from '@/components/UserMenu';
import { useUser } from '@/components/UserProvider';
import { useIsClient } from '@/hooks/is-client';
import { cn } from '@/lib/utils';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/utils/constants';

export default function NavBar() {
  const user = useUser();
  const pathname = usePathname();
  const isClient = useIsClient();

  return (
    <div className="border-b">
      {/* Desktop */}
      <div className="hidden h-14 items-center justify-between px-5 md:flex xl:px-8">
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
              <CommandMenu />
              <UserMenu />
            </>
          )}
        </div>
      </div>
      {/* Mobile */}
      <div className="flex h-12 items-center justify-between px-2 md:hidden">
        <MobileSheet />
        <Link
          className="text-center text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
          href={ROUTE_HREF.DASHBOARD}
        >
          Perfect Albums
        </Link>
        {isClient ? <UserMenu /> : <div className="size-9" />}
      </div>
    </div>
  );
}
