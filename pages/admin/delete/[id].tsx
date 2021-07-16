import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';

import { MESSAGES, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import { loadIdToken } from 'auth/firebaseAdmin';
import formatAlbum from 'lib/formatAlbum';
import { Album as AlbumType, Method } from 'utils/types';
import Album from 'models/Album';
import useSubmit from 'hooks/useSubmit';
import DeleteAlbum from 'components/DeleteAlbum';

interface Props {
  album: AlbumType;
}

const DeleteAlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter();
  const { search } = router.query;
  const options = {
    body: null,
    callbacks: [
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: { search },
        }),
    ],
    method: Method.delete,
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
