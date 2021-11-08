import { APP_MESSAGE_TYPES } from 'constants/index';

const { ERROR } = APP_MESSAGE_TYPES;

interface Props {
  message?: string;
  type?: APP_MESSAGE_TYPES;
}

export default function AppMessage({
  message = 'Something went wrong',
  type = ERROR,
}: Props) {
  return (
    <div className="mt-8 flex justify-center">
      <div
        className={`px-6 py-4 border-l-4 rounded-sm ${
          type === ERROR
            ? 'bg-red-200 border-red-700'
            : 'bg-blue-200 border-blue-700'
        }`}
        style={{ height: 'fit-content' }}
      >
        <p className="text-center text-lg">{message}</p>
      </div>
    </div>
  );
}
