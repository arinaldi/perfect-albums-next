import { forwardRef, InputHTMLAttributes, useReducer } from 'react';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { wrapperClassName = '', ...rest } = props;
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <div className={wrapperClassName}>
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white sm:text-sm"
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
            <EyeOpenIcon className="h-5 w-5" />
          ) : (
            <EyeNoneIcon className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
