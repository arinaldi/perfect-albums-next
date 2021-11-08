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
      className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900"
      disabled={isSubmitting}
      type="submit"
    >
      {isSubmitting ? loadingLabel : label}
    </button>
  );
}
