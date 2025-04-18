'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LogInIcon,
  LogOutIcon,
  PlusIcon,
  RocketIcon,
  UserIcon,
  Volume1Icon,
} from 'lucide-react';
import { toast } from 'sonner';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { useUser } from '@/components/UserProvider';
import { ROUTES_ADMIN, ROUTE_HREF } from '@/utils/constants';
import { signOut } from '@/app/actions';

export default function CommandMenu() {
  const user = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  function navigate(value: string) {
    setOpen(false);
    router.push(value);
  }

  async function onSignOut() {
    const result = await signOut();

    if (result?.type === 'error') {
      toast.error(result.message);
    }

    setOpen(false);
  }

  return (
    <>
      <p className="p-1 text-sm text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Quick links">
            <CommandItem
              className="gap-2"
              onSelect={navigate}
              value={ROUTE_HREF.DASHBOARD}
            >
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              className="gap-2"
              onSelect={navigate}
              value={ROUTE_HREF.TOP_ALBUMS}
            >
              <RocketIcon />
              <span>Top albums</span>
            </CommandItem>
            <CommandItem
              className="gap-2"
              onSelect={navigate}
              value={ROUTE_HREF.FEATURED_SONGS}
            >
              <Volume1Icon />
              <span>Featured songs</span>
            </CommandItem>
            <CommandItem
              className="gap-2"
              onSelect={navigate}
              value={ROUTE_HREF.NEW_RELEASES}
            >
              <CalendarIcon />
              <span>New releases</span>
            </CommandItem>
            <CommandItem
              className="gap-2"
              onSelect={navigate}
              value={ROUTE_HREF.ARTISTS}
            >
              <UserIcon />
              <span>Artists</span>
            </CommandItem>
          </CommandGroup>
          {user && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Admin">
                <CommandItem
                  className="gap-2"
                  onSelect={navigate}
                  value={ROUTES_ADMIN.base.href}
                >
                  <LayersIcon />
                  <span>Albums</span>
                </CommandItem>
                <CommandItem
                  className="gap-2"
                  onSelect={navigate}
                  value={ROUTES_ADMIN.add.href}
                >
                  <PlusIcon />
                  <span>{ROUTES_ADMIN.add.label}</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          <CommandGroup heading="Authentication">
            {user ? (
              <CommandItem className="gap-2" onSelect={onSignOut}>
                <LogOutIcon />
                <span>Sign out</span>
              </CommandItem>
            ) : (
              <CommandItem
                className="gap-2"
                onSelect={navigate}
                value={ROUTE_HREF.SIGNIN}
              >
                <LogInIcon />
                <span>Sign in</span>
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
