import { useState } from 'react';
import Link from 'next/link';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { type User } from '@supabase/supabase-js';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-2/3"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
        }}
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link
              className="text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary"
              href={ROUTE_HREF.DASHBOARD}
              onClick={onClose}
            >
              Perfect Albums
            </Link>
          </SheetTitle>
          <SheetDescription className="text-left">
            The best music on the net
          </SheetDescription>
        </SheetHeader>
        <nav className="flex h-full flex-col items-start justify-between pb-16 pt-8">
          <div className="flex w-full flex-col items-start gap-6">
            {ROUTES.map((r) => (
              <LinkWrapper key={r.href} href={r.href} onClick={onClose}>
                {r.label}
              </LinkWrapper>
            ))}
            <LinkWrapper href={ROUTE_HREF.ARTISTS} onClick={onClose}>
              Artists
            </LinkWrapper>
            {user ? (
              <>
                <LinkWrapper href={ROUTES_ADMIN.base.href} onClick={onClose}>
                  {ROUTES_ADMIN.base.label}
                </LinkWrapper>
                <Button
                  className="h-auto w-full justify-start p-0 text-lg text-muted-foreground hover:bg-transparent"
                  onClick={() => {
                    onClose();
                    signOut();
                  }}
                  variant="ghost"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <LinkWrapper href={ROUTE_HREF.SIGNIN} onClick={onClose}>
                Sign in
              </LinkWrapper>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatars/02.png" />
                <AvatarFallback>
                  {`${user.user_metadata.firstName[0]}${user.user_metadata.lastName[0]}`}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {`${user.user_metadata.firstName} ${user.user_metadata.lastName}`}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
