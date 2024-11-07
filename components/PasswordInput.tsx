import { useReducer } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PasswordInput = (props: React.ComponentProps<'input'>) => {
  const [on, toggle] = useReducer((flag) => !flag, false);

  return (
    <div className="relative">
      <Input className="pr-10" type={on ? 'text' : 'password'} {...props} />
      <Button
        aria-label="Show or hide password"
        className="absolute inset-y-0 right-0 mr-0.5 flex cursor-pointer items-center"
        size="icon"
        onClick={toggle}
        type="button"
        variant="ghost"
      >
        {on ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
