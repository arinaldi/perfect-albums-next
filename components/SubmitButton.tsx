import Spinner from 'components/Spinner';

interface Props {
  isSubmitting: boolean;
  label?: string;
  loadingLabel?: string;
}

export default function SubmitButton({
  isSubmitting,
  label = 'Save',
  loadingLabel = 'Saving',
}: Props) {
  return (
    <button
      className="mr-1 mb-1 flex items-center rounded bg-gray-600 px-6 py-3 text-sm font-bold uppercase text-white shadow hover:bg-gray-900 hover:shadow-lg focus:border-indigo-500 focus:ring-indigo-500 active:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? <Spinner className="mr-2 h-5 w-5 text-white" /> : null}
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
