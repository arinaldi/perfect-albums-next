import { useRouter } from 'next/router';

import { BASE_URL, MESSAGES, ROUTES_ADMIN } from 'constants/index';
import { COOKIE_KEY } from 'utils/storage';
import useSubmit from 'hooks/useSubmit';
import useAdminAlbums from 'hooks/useAdminAlbums';
import DeleteAlbum from 'components/DeleteAlbum';

export default function DeleteAlbumPage({ album }) {
  const router = useRouter();
  const { search } = router.query;
  const { mutate } = useAdminAlbums(`/api/albums?page=1&per_page=25&search=${search}&sort=&direction=`);
  const options = {
    body: null,
    callbacks: [mutate, () => router.push({
      pathname: ROUTES_ADMIN.base.href,
      query: { search },
    })],
    method: 'DELETE',
    path: `/api/albums/${album.id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <DeleteAlbum
      album={album}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
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
