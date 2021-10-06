import { FC } from 'react';
import { RefCallBack } from 'react-hook-form';

interface Props {
  id: string;
  inputRef: RefCallBack;
  label: string;
}

const Checkbox: FC<Props> = ({ id, inputRef, label, ...rest }) => {
  return (
    <fieldset className="mb-10">
      <div className="mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </p>
      </div>
      <div className="flex items-center mr-4">
        <input ref={(e) => inputRef(e)} type="checkbox" {...rest} />
      </div>
    </fieldset>
  );
};

export default Checkbox;
