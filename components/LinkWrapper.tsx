import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Children } from '@/utils/types';

interface Props extends Children {
  href: string;
  onClick: () => void;
}

export const linkClassName =
  'flex w-full items-center gap-4 rounded-lg px-3 py-2 text-lg font-medium transition-colors hover:text-primary';

export default function LinkWrapper({ children, href, onClick }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        linkClassName,
        pathname?.startsWith(href) ? 'bg-muted' : 'text-muted-foreground',
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
