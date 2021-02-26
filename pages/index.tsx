import { FC } from 'react';
import { GetServerSideProps } from 'next';

const HomePage: FC = () => {
  return null;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/top-albums',
      permanent: false,
    },
  };
};
