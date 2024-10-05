import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { type User } from '@supabase/supabase-js';
import { AvatarIcon, CheckIcon } from '@radix-ui/react-icons';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ROUTE_HREF } from '@/utils/constants';

interface Props {
  signOut: () => void;
  user: User | null;
}

const themes = ['light', 'dark', 'system'];

export function UserMenu({ signOut, user }: Props) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shrink-0 rounded-full" size="icon" variant="ghost">
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {themes.map((t) => (
                  <DropdownMenuItem
                    className={cn(
                      'capitalize',
                      t === theme ? 'font-semibold' : '',
                    )}
                    key={t}
                    onClick={() => setTheme(t)}
                  >
                    {t}
                    {t === theme && <CheckIcon className="ml-2 size-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
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
