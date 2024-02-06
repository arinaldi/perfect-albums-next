import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import Spinner from 'components/Spinner';
import { cn } from 'utils';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  isSubmitting?: boolean;
  label?: ReactNode;
}

const PrimaryButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    className = '',
    isSubmitting = false,
    label = 'Submit',
    ...rest
  } = props;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus-visible:outline-gray-500',
        className,
      )}
      ref={ref}
      type="submit"
      {...rest}
      disabled={rest.disabled || isSubmitting}
    >
      {isSubmitting && <Spinner className="-ml-0.5 size-4 text-white" />}
      {label}
    </button>
  );
});

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
