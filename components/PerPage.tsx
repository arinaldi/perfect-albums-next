import { FC } from 'react';

import { PER_PAGE } from 'constants/index';

interface Props {
  onPerPageChange: (value: number) => void;
  perPage: number;
}

const { SMALL, MEDIUM, LARGE } = PER_PAGE;

const PerPage: FC<Props> = ({ onPerPageChange, perPage }) => {
  return (
    <nav
      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
      aria-label="Pagination"
    >
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-black"
        disabled={perPage === SMALL}
        onClick={() => onPerPageChange(SMALL)}
      >
        <span className="sr-only">25</span>
        {SMALL}
      </button>
      <button
        className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-black"
        disabled={perPage === MEDIUM}
        onClick={() => onPerPageChange(MEDIUM)}
      >
        <span className="sr-only">50</span>
        {MEDIUM}
      </button>
      <button
        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-white dark:border-black"
        disabled={perPage === LARGE}
        onClick={() => onPerPageChange(LARGE)}
      >
        <span className="sr-only">100</span>
        {LARGE}
      </button>
    </nav>
  );
};

export default PerPage;
