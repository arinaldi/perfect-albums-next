import { ChangeEvent, FC, MouseEvent, RefObject } from 'react';
import { useRouter } from 'next/router';

import { ICONS, ROUTES_ADMIN } from 'constants/index';
import { Album } from 'hooks/useAdminAlbums';
import { getSortIcon } from 'utils';
import Layout from 'components/Layout';
import Pagination from 'components/Pagination';
import PerPage from 'components/PerPage';

interface Props {
  albums: Album[];
  currentPage: number;
  direction: string;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  onClear: () => void;
  onFirst: () => void;
  onLast: () => void;
  onNext: () => void;
  onPerPageChange: (value: number) => void;
  onPrevious: () => void;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSort: (event: MouseEvent<HTMLElement>) => void;
  perPage: number;
  searchRef: RefObject<HTMLInputElement>;
  searchText: string;
  sort: string;
  total: number;
}

const Admin: FC<Props> = ({
  albums,
  currentPage,
  direction,
  isFirstPage,
  isLastPage,
  isLoading,
  onClear,
  onFirst,
  onLast,
  onNext,
  onPerPageChange,
  onPrevious,
  onSearchChange,
  onSort,
  perPage,
  searchRef,
  searchText,
  sort,
  total,
}) => {
  const router = useRouter();

  const Title = (
    <>
      Admin
      <span className="ml-3 p-1 rounded-md bg-gray-100 text-xl sm:text-2xl font-semibold">
        {total.toLocaleString()}
      </span>
    </>
  );

  return (
    <Layout title={Title}>
      <div className="block sm:flex sm:justify-between sm:items-center mb-4">
        <input
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          id="search"
          name="search"
          onChange={onSearchChange}
          placeholder="Search"
          ref={searchRef}
          type="text"
          value={searchText}
        />
        <div className="block mt-2 sm:flex sm:mt-0 sm:ml-4">
          <button
            className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={onClear}
          >
            Clear
          </button>
          <button
            className="ml-1 py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={() => {
              router.push({
                pathname: ROUTES_ADMIN.create.href,
                query: { search: searchText },
              });
            }}
          >
            New
          </button>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <Pagination
          currentPage={currentPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
          onFirst={onFirst}
          onLast={onLast}
          onNext={onNext}
          onPrevious={onPrevious}
        />
        <div className="mx-2" />
        <PerPage
          onPerPageChange={onPerPageChange}
          perPage={perPage}
        />
      </div>

      {albums.length === 0 && !isLoading
        ? <p className="text-center mt-8 text-2xl">No results found</p>
        : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="">
                      <tr>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="artist"
                          onClick={onSort}
                          scope="col"
                        >
                          {sort === 'artist' && getSortIcon(direction)}
                          Artist
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="title"
                          onClick={onSort}
                          scope="col"
                        >
                          {sort === 'title' && getSortIcon(direction)}
                          Title
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider cursor-pointer"
                          data-value="year"
                          onClick={onSort}
                          scope="col"
                        >
                          {sort === 'year' && getSortIcon(direction)}
                          Year
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          CD
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          AotD
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          Favorite
                        </th>
                        <th
                          className="px-3 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider"
                          scope="col"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {albums.map(album => (
                        <tr key={album.id} className="odd:bg-gray-50">
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.artist}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.title}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.year}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.cd && ICONS.CHECK}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.aotd && ICONS.CHECK}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {album.favorite && ICONS.CHECK}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            <button
                              className="py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
                              onClick={() => {
                                router.push({
                                  pathname: `${ROUTES_ADMIN.edit.href}/${album.id}`,
                                  query: { search: searchText },
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="ml-1 py-1 px-2 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
                              onClick={() => {
                                router.push({
                                  pathname: `${ROUTES_ADMIN.delete.href}/${album.id}`,
                                  query: { search: searchText },
                                });
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
    </Layout>
  );
};

export default Admin;
