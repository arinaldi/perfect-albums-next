'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import Spinner from 'components/Spinner';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex min-w-[88px] items-center justify-center gap-2 whitespace-nowrap rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-500 dark:hover:bg-gray-400 dark:focus-visible:outline-gray-500"
      disabled={pending}
      type="submit"
    >
      {pending && <Spinner className="-ml-0.5 h-5 w-5 text-white" />}
      Submit
    </button>
  );
}
