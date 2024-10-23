import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { type User } from '@supabase/supabase-js';
import { AvatarIcon } from '@radix-ui/react-icons';

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
import { ROUTE_HREF } from '@/utils/constants';

interface Props {
  signOut: () => void;
  user: User | null;
}

export function UserMenu({ signOut, user }: Props) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

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
            <AvatarIcon className="size-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end" forceMount>
        {user && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{`${user.user_metadata.firstName} ${user.user_metadata.lastName}`}</p>
                <p className="text-xs leading-none text-muted-foreground">
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
