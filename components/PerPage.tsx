import { PER_PAGE } from 'constants/index';
import { usePerPage } from 'hooks/useAdminStore';

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

export default function PerPage() {
  const { perPage, onPerPageChange } = usePerPage();

  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <button
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={perPage === SMALL}
        onClick={() => onPerPageChange(SMALL)}
      >
        <span className="sr-only">{SMALL}</span>
        {SMALL}
      </button>
      <button
        className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={perPage === MEDIUM}
        onClick={() => onPerPageChange(MEDIUM)}
      >
        <span className="sr-only">{MEDIUM}</span>
        {MEDIUM}
      </button>
      <button
        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={perPage === LARGE}
        onClick={() => onPerPageChange(LARGE)}
      >
        <span className="sr-only">{LARGE}</span>
        {LARGE}
      </button>
    </nav>
  );
}
