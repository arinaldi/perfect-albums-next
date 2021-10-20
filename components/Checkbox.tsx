import { forwardRef } from 'react';

interface Props {
  id: string;
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ id, label, ...rest }, ref) => {
    return (
      <fieldset className="mb-10">
        <div className="mb-2">
          <p className="text-sm font-medium text-gray-700 dark:text-white">
            {label}
          </p>
        </div>
        <div className="flex items-center mr-4">
          <input ref={ref} type="checkbox" {...rest} />
        </div>
      </fieldset>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
