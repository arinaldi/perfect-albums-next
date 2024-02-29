import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { type User } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/utils/constants';

interface Props {
  signOut: () => void;
  user: User | null;
}

export function MobileSheet({ signOut, user }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link
              className="font-semibold transition-colors hover:text-primary"
              href="/dashboard"
              onClick={onClose}
            >
              Perfect albums
            </Link>
          </SheetTitle>
          <SheetDescription className="text-left">
            The best music on the net
          </SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col items-start gap-4">
          {ROUTES.map((r) => (
            <Link
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                !pathname?.startsWith(r.href) ? 'text-muted-foreground' : '',
              )}
              key={r.href}
              href={r.href}
              onClick={onClose}
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
              onClick={onClose}
            >
              {ROUTES_ADMIN.base.label}
            </Link>
          )}
          {user ? (
            <Button
              className="h-auto p-0 text-muted-foreground hover:bg-transparent"
              onClick={() => {
                onClose();
                signOut();
              }}
              variant="ghost"
            >
              Sign out
            </Button>
          ) : (
            <Button
              asChild
              className="h-auto p-0 hover:bg-transparent"
              variant="ghost"
            >
              <Link
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                href={ROUTE_HREF.SIGNIN}
                onClick={onClose}
              >
                Sign in
              </Link>
            </Button>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}