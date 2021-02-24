export default function HomePage() {
  return null;
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: '/top-albums',
      permanent: false,
    },
  };
}
