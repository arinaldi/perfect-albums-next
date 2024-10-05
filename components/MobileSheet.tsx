import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { type User } from '@supabase/supabase-js';

import { Button } from '@/components/ui/button';
import LinkWrapper from '@/components/LinkWrapper';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/utils/constants';

interface Props {
  signOut: () => void;
  user: User | null;
}

const iconClassName = 'size-5';

export function MobileSheet({ signOut, user }: Props) {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon className="size-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col p-4"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        side="left"
      >
        <SheetHeader className="pl-3 text-left">
          <SheetTitle>
            <Link
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
              href={ROUTE_HREF.DASHBOARD}
              onClick={onClose}
            >
              Perfect Albums
            </Link>
          </SheetTitle>
          <SheetDescription>The best music on the net</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-3">
          {ROUTES.map((r) => (
            <LinkWrapper key={r.href} href={r.href} onClick={onClose}>
              <r.icon className={iconClassName} />
              {r.label}
            </LinkWrapper>
          ))}
          {user && (
            <LinkWrapper href={ROUTES_ADMIN.base.href} onClick={onClose}>
              <LockClosedIcon className={iconClassName} />
              {ROUTES_ADMIN.base.label}
            </LinkWrapper>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
