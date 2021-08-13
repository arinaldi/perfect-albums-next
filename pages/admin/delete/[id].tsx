import { FC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { getTitle } from 'utils';
import api from 'utils/api';
import { Album as AlbumType } from 'utils/types';
import Album from 'models/Album';
import useSubmit from 'hooks/useSubmit';
import { getAlbumIds } from 'pages/api/albumIds';
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
      await api(`/api/albums/${album.id}`, {
        body: null,
        method: METHODS.DELETE,
      });
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

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const ids = await getAlbumIds();

  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const payload = {
    props: { album: {} },
    revalidate: 1,
  };

  if (!params?.id) return payload;

  await dbConnect();
  const data = await Album.findById(params.id);

  if (data) {
    payload.props.album = formatAlbum(data);
  }

  return payload;
};
