import { useState } from 'react';
import Link from 'next/link';
import {
  EnterIcon,
  ExitIcon,
  HamburgerMenuIcon,
  LockClosedIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { type User } from '@supabase/supabase-js';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LinkWrapper, { linkClassName } from '@/components/LinkWrapper';
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
          <LinkWrapper href={ROUTE_HREF.ARTISTS} onClick={onClose}>
            <PersonIcon className={iconClassName} />
            Artists
          </LinkWrapper>
          {user ? (
            <>
              <LinkWrapper href={ROUTES_ADMIN.base.href} onClick={onClose}>
                <LockClosedIcon className={iconClassName} />
                {ROUTES_ADMIN.base.label}
              </LinkWrapper>
              <Button
                className={cn(
                  linkClassName,
                  'h-auto justify-start text-muted-foreground hover:bg-transparent',
                )}
                onClick={() => {
                  onClose();
                  signOut();
                }}
                variant="ghost"
              >
                <ExitIcon className={iconClassName} />
                Sign out
              </Button>
            </>
          ) : (
            <LinkWrapper href={ROUTE_HREF.SIGNIN} onClick={onClose}>
              <EnterIcon className={iconClassName} />
              Sign in
            </LinkWrapper>
          )}
        </nav>
        {user && (
          <div className="mt-auto flex items-center gap-3 px-2 py-1">
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
      </SheetContent>
    </Sheet>
  );
}
