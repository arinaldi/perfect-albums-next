import { FC } from 'react';
import { GetServerSideProps, NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { loadIdToken } from 'auth/firebaseAdmin';
import { getTitle } from 'utils';
import api from 'utils/api';
import { Album as AlbumType, AlbumInput } from 'utils/types';
import Album from 'models/Album';
import useAdminState from 'hooks/useAdminState';
import useForm from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import EditAlbum from 'components/EditAlbum';

interface Props {
  album: AlbumType;
}

const EditAlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter();
  const { values, handleChange } = useForm<AlbumInput>({
    artist: album.artist,
    title: album.title,
    year: album.year,
    cd: album.cd,
    aotd: album.aotd,
    favorite: album.favorite,
    studio: album.studio,
  });
  const { mutate } = useAdminState();
  const options = {
    callbacks: [
      mutate,
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
      await api(`/api/albums/${album.id}`, {
        body: values,
        method: METHODS.PUT,
      });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Edit Album')}</title>
      </Head>
      <EditAlbum
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values as AlbumInput}
      />
    </>
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
