'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import Spinner from 'components/Spinner';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex min-w-[96px] items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hover:shadow-md focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={pending}
      type="submit"
    >
      {pending ? <Spinner className="h-5 w-5 text-white" /> : 'Submit'}
    </button>
  );
}
