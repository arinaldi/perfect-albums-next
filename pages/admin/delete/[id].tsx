import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import { loadIdToken } from 'auth/firebaseAdmin';
import formatAlbum from 'lib/formatAlbum';
import { getTitle } from 'utils';
import api from 'utils/api';
import { Album as AlbumType } from 'utils/types';
import Album from 'models/Album';
import useSubmit from 'hooks/useSubmit';
import DeleteAlbum from 'components/DeleteAlbum';

interface Props {
  album: AlbumType;
}

const DeleteAlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter();
  const options = {
    callbacks: [
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: router.query,
        }),
    ],
    submitFn: async () => {
      await api(`/api/albums/${album.id}`, { body: null, method: METHODS.DELETE });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Delete Album')}</title>
      </Head>
      <DeleteAlbum
        album={album}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DeleteAlbumPage;

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
