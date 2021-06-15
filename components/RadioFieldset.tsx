import { ChangeEvent, FC } from 'react';

interface Props {
  id: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}

const RadioFieldset: FC<Props> = ({ id, label, onChange, value }) => {
  const falseId = `${id}_false`;
  const trueId = `${id}_true`;

  return (
    <fieldset className="mb-10">
      <div className="mb-2">
        <p className="capitalize text-sm font-medium text-gray-700 dark:text-white">
          {label}
        </p>
      </div>
      <div className="flex">
        <div className="flex items-center mr-4">
          <input
            checked={value === false}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-black dark:bg-gray-700"
            id={falseId}
            name={id}
            onChange={onChange}
            type="radio"
            value="false"
          />
          <label
            className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
            htmlFor={falseId}
          >
            false
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={value === true}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-black dark:bg-gray-700"
            id={trueId}
            name={id}
            onChange={onChange}
            type="radio"
            value="true"
          />
          <label
            className="ml-3 block text-sm font-medium text-gray-700 dark:text-white"
            htmlFor={trueId}
          >
            true
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default RadioFieldset;
