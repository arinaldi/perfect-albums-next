import { ROUTE_HREF } from 'constants/index';

export default function HomePage() {
  return null;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: ROUTE_HREF.TOP_ALBUMS,
      permanent: false,
    },
  };
}
