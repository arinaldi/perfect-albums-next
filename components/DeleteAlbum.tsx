import { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';

import { ROUTES_ADMIN } from 'constants/index';
import { Album } from 'utils/types';

interface Props {
  album: Album;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => void;
}

const DeleteAlbum: FC<Props> = ({ album, isSubmitting, onSubmit }) => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-4 dark:bg-gray-800">
      <h1 className="text-2xl sm:text-3xl font-semibold dark:text-white">Delete Album</h1>
      <div className="relative flex-auto">
        <form method="POST" onSubmit={onSubmit}>
          <div className="bg-white p-6 dark:bg-gray-800 dark:text-white">
            Are you sure you want to delete {album.artist} – {album.title}?
          </div>
          <div className="flex items-center justify-end p-6">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              onClick={() => {
                router.push({
                  pathname: ROUTES_ADMIN.base.href,
                  query: { search },
                });
              }}
              style={{ transition: 'all .15s ease' }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-gray-800"
              disabled={isSubmitting}
              style={{
                minWidth: '135px',
                transition: 'all .15s ease',
              }}
              type="submit"
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteAlbum;
