import { forwardRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const CancelButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, onClick, ...rest }, ref) => {
    return (
      <button
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:border-gray-600 dark:bg-transparent dark:text-white dark:hover:bg-gray-900"
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

CancelButton.displayName = 'CancelButton';

export default CancelButton;
