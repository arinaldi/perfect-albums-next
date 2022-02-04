interface Props {
  isSubmitting: boolean;
  label?: string;
  loadingLabel?: string;
}

export default function SubmitButton({
  isSubmitting,
  label = 'Save',
  loadingLabel = 'Saving...',
}: Props) {
  return (
    <button
      className="mr-1 mb-1 rounded bg-gray-600 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:bg-gray-900 hover:shadow-lg focus:outline-none active:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
