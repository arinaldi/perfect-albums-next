import { forwardRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const OutlineButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, ...rest }, ref) => {
    return (
      <button
        className="inline-flex min-w-[96px] items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-500 shadow-sm hover:bg-gray-50 hover:shadow-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
        onClick={onClick}
        ref={ref}
        type="button"
        {...rest}
      >
        {children}
      </button>
    );
  },
);

OutlineButton.displayName = 'OutlineButton';

export default OutlineButton;
