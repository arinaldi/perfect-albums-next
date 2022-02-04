interface Props {
  onClick: () => void;
}

export default function CancelButton({ onClick }: Props) {
  return (
    <button
      className="background-transparent mr-1 mb-1 rounded px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none hover:bg-gray-200 focus:outline-none"
      onClick={onClick}
      type="button"
    >
      Cancel
    </button>
  );
}
