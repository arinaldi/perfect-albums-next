import { forwardRef, useReducer } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const PasswordInput = forwardRef<HTMLInputElement>(({ ...rest }, ref) => {
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-white"
      >
        Password
      </label>
      <div className="relative">
        <input
          autoCapitalize="off"
          autoComplete="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
          id="password"
          ref={ref}
          required
          type={on ? 'text' : 'password'}
          {...rest}
        />
        <div
          aria-label="Show or hide password"
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 dark:text-white"
          onClick={toggle}
        >
          {on ? (
            <EyeIcon className="h-5 w-5" />
          ) : (
            <EyeSlashIcon className="h-5 w-5" />
          )}
        </div>
      </div>
    </>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
