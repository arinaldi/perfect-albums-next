import useAdminState from 'hooks/useAdminState';

export default function Pagination() {
  const { handlers, isFirstPage, isLastPage, page } = useAdminState();
  const { onFirst, onLast, onNext, onPrevious } = handlers;

  return (
    <nav
      className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <button
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={isFirstPage}
        onClick={onFirst}
      >
        <span className="sr-only">First page</span>«
      </button>
      <button
        className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={isFirstPage}
        onClick={onPrevious}
      >
        <span className="sr-only">Previous page</span>‹
      </button>
      <span className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:border-black dark:bg-gray-700 dark:text-white">
        {page}
      </span>
      <button
        className="relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={isLastPage}
        onClick={onNext}
      >
        <span className="sr-only">Next page</span>›
      </button>
      <button
        className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-black dark:bg-gray-700 dark:text-white"
        disabled={isLastPage}
        onClick={onLast}
      >
        <span className="sr-only">Last page</span>»
      </button>
    </nav>
  );
}
