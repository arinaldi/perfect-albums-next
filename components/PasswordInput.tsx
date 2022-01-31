import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const PasswordInput = forwardRef<HTMLInputElement>(({ ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

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
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:border-black dark:bg-gray-700 dark:text-white"
          id="password"
          ref={ref}
          required
          type={showPassword ? 'text' : 'password'}
          {...rest}
        />
        <div
          aria-label="Show or hide password"
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={() => setShowPassword((show) => !show)}
        >
          {showPassword ? (
            <EyeIcon className="w-5 h-5" />
          ) : (
            <EyeOffIcon className="w-5 h-5" />
          )}
        </div>
      </div>
    </>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
