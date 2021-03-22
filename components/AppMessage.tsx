import { FC } from 'react';

interface Props {
  message?: string;
}

const AppMessage: FC<Props> = (props) => {
  const { message = 'Something went wrong' } = props;

  return (
    <p className="text-center mt-8 text-2xl">{message}</p>
  );
};

export default AppMessage;
