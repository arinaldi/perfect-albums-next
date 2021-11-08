interface Props {
  onClick: () => void;
}

export default function CancelButton({ onClick }: Props) {
  return (
    <button
      className="text-red-500 background-transparent font-bold uppercase px-6 py-3 rounded text-sm outline-none focus:outline-none mr-1 mb-1 hover:bg-gray-200"
      onClick={onClick}
      type="button"
    >
      Cancel
    </button>
  );
}
