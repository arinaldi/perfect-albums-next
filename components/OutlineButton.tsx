import { forwardRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const OutlineButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { children, onClick, ...rest } = props;

  return (
    <button
      className="inline-flex min-w-[88px] items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
      onClick={onClick}
      ref={ref}
      type="button"
      {...rest}
    >
      {children}
    </button>
  );
});

OutlineButton.displayName = 'OutlineButton';

export default OutlineButton;
