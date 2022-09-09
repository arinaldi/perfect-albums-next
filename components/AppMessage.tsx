import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';

import { APP_MESSAGE_TYPES } from 'constants/index';

const { ERROR, INFO } = APP_MESSAGE_TYPES;

interface Props {
  message?: string;
  type?: APP_MESSAGE_TYPES;
}

const styles = {
  [ERROR]: 'bg-red-100 border-red-700 text-red-700',
  [INFO]: 'bg-blue-100 border-blue-700 text-blue-700',
};

const className = 'w-6 h-6';
const icons = {
  [ERROR]: <ExclamationCircleIcon className={className} />,
  [INFO]: <InformationCircleIcon className={className} />,
};

export default function AppMessage({
  message = 'Something went wrong',
  type = ERROR,
}: Props) {
  return (
    <div className="mt-8 text-center">
      <div
        className={`inline-flex items-center rounded border-l-4 py-4 pl-5 pr-6 ${styles[type]}`}
        role="alert"
      >
        {icons[type]}
        <p className="ml-3 text-center">{message}</p>
      </div>
    </div>
  );
}
