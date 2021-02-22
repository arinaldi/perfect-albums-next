import { isTokenValid } from 'utils/auth';

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Admin</h1>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const isValid = await isTokenValid(req);

  if (!isValid) {
    return {
      redirect: {
        destination: '/top-albums',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
