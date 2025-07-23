import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { CircleUserIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/components/UserProvider';
import { ROUTE_HREF, ROUTES_ADMIN } from '@/utils/constants';
import { createClient } from '@/utils/supabase/client';

export function UserMenu() {
  const user = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const { setTheme, theme } = useTheme();

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (pathname.startsWith(ROUTES_ADMIN.base.href)) {
      router.push(ROUTE_HREF.TOP_ALBUMS);
    }

    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shrink-0 rounded-full" size="icon" variant="outline">
          {user ? (
            <Avatar className="size-8">
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>
                {' '}
                {`${user.user_metadata.firstName[0]}${user.user_metadata.lastName[0]}`}
              </AvatarFallback>
            </Avatar>
          ) : (
            <CircleUserIcon className="size-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">{`${user.user_metadata.firstName} ${user.user_metadata.lastName}`}</p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">Theme</DropdownMenuLabel>
          <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem onSelect={signOut}>Sign out</DropdownMenuItem>
        ) : (
          <DropdownMenuItem onSelect={() => router.push(ROUTE_HREF.SIGNIN)}>
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
