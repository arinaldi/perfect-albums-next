import useAdminState from 'hooks/useAdminState';

export default function StudioFilter() {
  const { handlers, studio } = useAdminState();
  const { onFilter } = handlers;

  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Studio filter"
    >
      <button
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={studio === ''}
        onClick={onFilter}
      >
        <span className="sr-only">Off</span>
        Off
      </button>
      <button
        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={studio === 'true'}
        onClick={onFilter}
      >
        <span className="sr-only">On</span>
        On*
      </button>
    </nav>
  );
}
