interface Props {
  onClick: () => void;
}

export default function CancelButton({ onClick }: Props) {
  return (
    <button
      className="background-transparent rounded px-6 py-3 text-sm font-bold uppercase text-red-500 hover:bg-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
      onClick={onClick}
      type="button"
    >
      Cancel
    </button>
  );
}
