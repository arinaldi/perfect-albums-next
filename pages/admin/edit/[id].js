import { useRouter } from 'next/router';

import { BASE_URL, MESSAGES } from 'constants/index';
import { COOKIE_KEY } from 'utils/storage';
import useForm from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import useAdminAlbums from 'hooks/useAdminAlbums';
import EditAlbum from 'components/EditAlbum';

export default function EditAlbumPage({ album }) {
  const router = useRouter();
  const { search } = router.query;
  const { mutate } = useAdminAlbums(`/api/albums?page=1&per_page=25&search=${search}&sort=&direction=`);
  const { values, handleChange } = useForm({
    artist: album.artist,
    title: album.title,
    year: album.year,
    cd: album.cd,
    aotd: album.aotd,
    favorite: album.favorite,
  });
  const options = {
    body: values,
    callbacks: [mutate, () => router.push({
      pathname: '/admin',
      query: { search },
    })],
    method: 'PUT',
    path: `/api/albums/${album.id}`,
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <EditAlbum
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={values}
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
