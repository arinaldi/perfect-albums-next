import { forwardRef } from 'react';

interface Props {
  defaultChecked?: boolean;
  id: string;
  label: string;
  name?: string;
  wrapperClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { defaultChecked, id, label, wrapperClassName = '', ...rest } = props;

  return (
    <fieldset className={`flex items-center ${wrapperClassName}`}>
      <input
        className="size-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
        defaultChecked={defaultChecked}
        id={id}
        ref={ref}
        type="checkbox"
        {...rest}
      />
      <label
        className="ml-2 text-sm font-medium text-gray-700 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
    </fieldset>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
