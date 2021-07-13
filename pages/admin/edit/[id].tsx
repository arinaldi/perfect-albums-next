import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';

import { MESSAGES, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { loadIdToken } from 'auth/firebaseAdmin';
import { Album as AlbumType, Method } from 'utils/types';
import Album from 'models/Album';
import useForm, { AlbumInput } from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import useAdminAlbums from 'hooks/useAdminAlbums';
import EditAlbum from 'components/EditAlbum';

interface Props {
  album: AlbumType;
}

const EditAlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter();
  const { search } = router.query;
  const { mutate } = useAdminAlbums(
    `/api/albums?page=1&per_page=25&search=${search}&sort=&direction=`,
  );
  const { values, handleChange } = useForm<AlbumInput>({
    artist: album.artist,
    title: album.title,
    year: album.year,
    cd: album.cd,
    aotd: album.aotd,
    favorite: album.favorite,
  });
  const options = {
    body: values,
    callbacks: [
      mutate,
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: { search },
        }),
    ],
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
      values={values as AlbumInput}
    />
  );
};

export default EditAlbumPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const uid = await loadIdToken(req as NextApiRequest);
  const payload = {
    props: { album: {} },
  };

  if (!uid || !params?.id) return payload;

  await dbConnect();
  const data = await Album.findById(params.id);

  if (data) {
    payload.props.album = formatAlbum(data);
  }

  return payload;
};
