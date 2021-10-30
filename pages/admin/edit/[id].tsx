import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import formatAlbum from 'lib/formatAlbum';
import { getTitle } from 'utils';
import api from 'utils/api';
import { Album as AlbumType, AlbumInput } from 'utils/types';
import Album from 'models/Album';
import useAdminState from 'hooks/useAdminState';
import useSubmit from 'hooks/useSubmit';
import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

interface Props {
  album: AlbumType;
}

const EditAlbumPage: FC<Props> = ({ album }) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: {
      artist: album.artist,
      title: album.title,
      year: album.year,
      cd: album.cd,
      aotd: album.aotd,
      favorite: album.favorite,
      studio: album.studio,
    },
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
    handleSubmit,
    submitFn: async (data: AlbumInput) => {
      await api(`/api/albums/${album.id}`, {
        body: data,
        method: METHODS.PUT,
      });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} edited`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Edit Album')}</title>
      </Head>
      <Layout title="Edit Album">
        <AlbumForm
          isSubmitting={isSubmitting}
          register={register}
          onSubmit={onSubmit}
        />
      </Layout>
    </>
  );
};

export default EditAlbumPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      redirect: {
        destination: '/top-albums',
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
