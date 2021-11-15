import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTE_HREF, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { getTitle } from 'utils';
import { Album as AlbumType } from 'utils/types';
import Album from 'models/Album';
import useMutation from 'hooks/useMutation';
import useSubmit from 'hooks/useSubmit';
import DeleteAlbum from 'components/DeleteAlbum';

interface Props {
  album: AlbumType;
}

export default function DeleteAlbumPage({ album }: Props) {
  const router = useRouter();
  const deleteAlbum = useMutation(`/api/albums/${album.id}`);

  const options = {
    callbacks: [
      () => {
        const query = { ...router.query };
        delete query.id;

        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query,
        });
      },
    ],
    submitFn: async () => {
      await deleteAlbum({
        body: null,
        method: METHODS.DELETE,
      });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} deleted`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Delete Album')}</title>
      </Head>
      <DeleteAlbum
        album={album}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        destination: ROUTE_HREF.TOP_ALBUMS,
        permanent: false,
      },
    };
  }

  await dbConnect();
  const data = await Album.findById(params.id);
  const payload = {
    props: { album: {} },
  };

  if (data) {
    payload.props.album = formatAlbum(data);
  }

  return payload;
};
