import useAdminState from 'hooks/useAdminState';

export default function StudioFilter() {
  const { handlers, studio } = useAdminState();
  const { onFilter } = handlers;

  return (
    <nav
      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      aria-label="Studio filter"
    >
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-black"
        disabled={studio === ''}
        onClick={onFilter}
      >
        <span className="sr-only">Off</span>
        Off
      </button>
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-black"
        disabled={studio === 'true'}
        onClick={onFilter}
      >
        <span className="sr-only">On</span>
        On*
      </button>
    </nav>
  );
}
