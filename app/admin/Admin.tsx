import { CheckIcon } from '@radix-ui/react-icons';

import { Album } from 'utils/types';
import AppMessage from 'components/AppMessage';
import AlbumActions from 'app/admin/AlbumActions';
import Badge from 'components/Badge';
import Column from 'app/admin/Column';
import Layout from 'components/AppLayout';
import AddAlbumButton from 'app/admin/AddAlbumButton';
import Pagination from 'app/admin/Pagination';
import PerPage from 'app/admin/PerPage';
import Search from 'app/admin/Search';
import SortableColumn from 'app/admin/SortableColumn';
import StudioFilter from 'app/admin/StudioFilter';

interface Props {
  albums: Album[];
  cdTotal: number;
  total: number;
}

export default function Admin({ albums, cdTotal, total }: Props) {
  const Title = (
    <div className="flex items-center gap-2">
      <span>Admin</span>
      <Badge label={total.toLocaleString()} />
    </div>
  );

  const AppMetadata = (
    <div className="flex items-center gap-4 dark:text-white">
      <code className="text-xs">{process.env.NEXT_PUBLIC_APP_VERSION}</code>
      <span className="flex items-center gap-0.5">
        <Badge label={cdTotal.toLocaleString()} />
        <span className="text-sm">CD{cdTotal === 1 ? '' : 's'}</span>
      </span>
    </div>
  );

  return (
    <Layout title={Title} titleAction={AppMetadata}>
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Search autoFocus type="artist" />
        <Search type="title" />
        <AddAlbumButton />
      </div>

      <div className="mb-2 flex justify-center sm:mb-4">
        <Pagination total={total} />
        <div className="mx-2" />
        <PerPage />
        <div className="mx-2" />
        <div className="hidden sm:block">
          <StudioFilter />
        </div>
      </div>

      <div className="mb-4 flex justify-center sm:mb-0 sm:hidden">
        <StudioFilter />
      </div>

      {albums?.length === 0 ? (
        <AppMessage message="No results found" variant="info" />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-gray-200 dark:border-black sm:rounded-lg">
                <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-black sm:table-fixed">
                  <thead>
                    <tr>
                      <SortableColumn
                        prop="artist"
                        wrapperClassName="sm:w-1/4 sm:max-w-0"
                      >
                        Artist
                      </SortableColumn>
                      <SortableColumn
                        prop="title"
                        wrapperClassName="sm:w-1/3 sm:max-w-0"
                      >
                        Title
                      </SortableColumn>
                      <SortableColumn prop="year" wrapperClassName="sm:w-1/12">
                        Year
                      </SortableColumn>
                      <Column wrapperClassName="sm:w-1/12">Favorite</Column>
                      <Column wrapperClassName="sm:w-1/12">Actions</Column>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500">
                    {albums?.map(
                      ({ artist, cd, favorite, id, studio, title, year }) => (
                        <tr
                          key={id}
                          className="even:bg-gray-0 odd:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                        >
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate">
                            {artist}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/3 sm:max-w-0 sm:truncate">
                            {cd ? (
                              <span className="mr-1 text-xs">💿</span>
                            ) : null}
                            <span
                              className={
                                studio ? 'font-medium italic' : 'font-light'
                              }
                            >
                              {title}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                            {year}
                          </td>
                          <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/12">
                            {favorite ? (
                              <CheckIcon className="inline size-5" />
                            ) : null}
                          </td>
                          <td className="whitespace-nowrap px-3 py-2 text-gray-900 dark:text-white sm:w-1/12">
                            <AlbumActions id={id} />
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
