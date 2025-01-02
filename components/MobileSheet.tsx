import { useState } from 'react';
import Link from 'next/link';
import { LockIcon, MenuIcon } from 'lucide-react';

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
import { useUser } from '@/components/UserProvider';
import { ROUTE_HREF, ROUTES, ROUTES_ADMIN } from '@/utils/constants';

const iconClassName = 'size-5';

export function MobileSheet() {
  const user = useUser();
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon className="size-4" />
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
              <LockIcon className={iconClassName} />
              {ROUTES_ADMIN.base.label}
            </LinkWrapper>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
