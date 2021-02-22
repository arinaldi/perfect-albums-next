export default function Pagination({ onFirst, onLast, onPrevious, onNext, currentPage, isFirstPage, isLastPage }) {
  return (
    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isFirstPage}
        onClick={onFirst}
      >
        <span className="sr-only">First page</span>
        «
      </button>
      <button
        className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isFirstPage}
        onClick={onPrevious}
      >
        <span className="sr-only">Previous page</span>
        ‹
      </button>
      <span className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
        {currentPage}
      </span>
      <button
        className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLastPage}
        onClick={onNext}
      >
        <span className="sr-only">Next page</span>
        ›
      </button>
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLastPage}
        onClick={onLast}
      >
        <span className="sr-only">Last page</span>
        »
      </button>
    </nav>
  );
}
