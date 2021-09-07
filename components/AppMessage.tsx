import { FC } from 'react';

interface Props {
  message?: string;
}

const AppMessage: FC<Props> = ({ message = 'Something went wrong' }) => (
  <div className="mt-8 flex justify-center min-h-screen">
    <div
      className="px-6 py-4 bg-red-200 border-l-4 border-red-700 rounded-sm"
      style={{ height: 'fit-content' }}
    >
      <p className="text-center text-lg">{message}</p>
    </div>
  </div>
);

export default AppMessage;
