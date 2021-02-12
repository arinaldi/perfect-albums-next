import Link from 'next/link';

import { useAppState } from '../components/Provider';

export default function Admin () {
  const { user: { isAuthenticated } } = useAppState();

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center mt-16">
        <Link href="/signin">
          <a className="text-xl text-blue-600">Go to Signin</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Admin</h1>
      </div>
    </div>
  );
}
