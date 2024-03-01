import { forwardRef, InputHTMLAttributes, useReducer } from 'react';
import { EyeOpenIcon, EyeNoneIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PasswordInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <div className="relative">
      <Input ref={ref} type={on ? 'text' : 'password'} {...props} />
      <Button
        aria-label="Show or hide password"
        className="absolute inset-y-0 right-0 mr-0.5 flex cursor-pointer items-center"
        size="icon"
        onClick={toggle}
        type="button"
        variant="ghost"
      >
        {on ? (
          <EyeOpenIcon className="size-4" />
        ) : (
          <EyeNoneIcon className="size-4" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
