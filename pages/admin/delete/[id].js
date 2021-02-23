import { useRouter } from 'next/router';

import { BASE_URL, MESSAGES } from 'constants/index';
import { COOKIE_KEY } from 'utils/storage';
import useSubmit from 'hooks/useSubmit';
import useAdminAlbums from 'hooks/useAdminAlbums';

export default function DeleteAlbum ({ album }) {
  const router = useRouter();
  const { mutate } = useAdminAlbums('/api/albums?page=1&per_page=25&search=&sort=&direction=');
  const options = {
    body: null,
    callbacks: [mutate, () => router.push('/admin')],
    method: 'DELETE',
    path: `/api/albums/${album.id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-semibold">Delete Album</h1>
      <div className="relative flex-auto">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="bg-white p-6">
            Are you sure you want to delete {album.artist} – {album.title}?
          </div>
          <div className="flex items-center justify-end p-6">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              onClick={() => {
                router.push('/admin');
              }}
              style={{ transition: 'all .15s ease' }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-gray-600 text-white active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 disabled:opacity-50"
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
}

export async function getServerSideProps({ params, req }) {
  const token = req.cookies[COOKIE_KEY];
  const payload = {
    props: { album: null },
  };

  if (!token) return payload;

  const response = await fetch(`${BASE_URL}/api/albums/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  payload.props.album = data;

  return payload;
}
