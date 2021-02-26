import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { BASE_URL, MESSAGES, ROUTES_ADMIN } from 'constants/index';
import { COOKIE_KEY } from 'utils/storage';
import useForm from 'hooks/useForm';
import useSubmit, { Method } from 'hooks/useSubmit';
import useAdminAlbums, { Album } from 'hooks/useAdminAlbums';
import EditAlbum from 'components/EditAlbum';

interface Props {
  album: Album;
}

const EditAlbumPage: FC<Props> = ({ album }) => {
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
      pathname: ROUTES_ADMIN.base.href,
      query: { search },
    })],
    method: Method.put,
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
};

export default EditAlbumPage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const token = req.cookies[COOKIE_KEY];
  const payload = {
    props: { album: {} },
  };

  if (!token || !params?.id) return payload;

  const response = await fetch(`${BASE_URL}/api/albums/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  payload.props.album = data;

  return payload;
};
