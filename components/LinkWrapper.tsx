import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Children } from '@/utils/types';

interface Props extends Children {
  href: string;
  onClick: () => void;
}

export default function LinkWrapper({ children, href, onClick }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'w-full text-lg font-medium transition-colors hover:text-primary',
        !pathname?.startsWith(href) ? 'text-muted-foreground' : '',
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
