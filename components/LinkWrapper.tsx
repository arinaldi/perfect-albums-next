import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
  classNames?: string;
  href: string;
  onClick?: () => void;
}

export default function LinkWrapper({
  children,
  classNames,
  href,
  onClick,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname?.startsWith(href);

  return (
    <Link
      key={href}
      href={href}
      className={`${isActive ? 'text-white' : 'text-gray-300'} ${
        classNames || ''
      } rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800`}
      onClick={onClick}
    >
      <span className={`${isActive ? 'border-b-2' : ''} pb-1`}>{children}</span>
    </Link>
  );
}
