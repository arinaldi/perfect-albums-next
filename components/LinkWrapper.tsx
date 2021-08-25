import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  classNames?: string;
  href: string;
  onClick?: () => void;
}

const LinkWrapper: FC<Props> = ({ children, classNames, href, onClick }) => {
  const { pathname } = useRouter();
  const isActive = href === pathname;

  return (
    <Link key={href} href={href}>
      <a
        className={`${isActive ? 'text-white' : 'text-gray-300'} ${
          classNames || ''
        } font-medium px-3 py-2 rounded-md hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800`}
        onClick={onClick}
      >
        <span className={`${isActive ? 'border-b-2' : ''} pb-1`}>
          {children}
        </span>
      </a>
    </Link>
  );
};

export default LinkWrapper;
