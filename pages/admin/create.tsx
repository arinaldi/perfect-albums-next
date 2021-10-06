import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import useAdminState from 'hooks/useAdminState';
import useSubmit from 'hooks/useSubmit';
import { getTitle } from 'utils';
import api from 'utils/api';
import { AlbumInput } from 'utils/types';
import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

const CreateAlbumPage: FC = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });
  const { mutate } = useAdminState();

  const options = {
    callbacks: [
      mutate,
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: router.query,
        }),
    ],
    handleSubmit,
    submitFn: async (data: AlbumInput) => {
      await api('/api/albums', { body: data, method: METHODS.POST });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { isSubmitting, onSubmit } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Create Album')}</title>
      </Head>
      <Layout title="Create Album">
        <AlbumForm
          isSubmitting={isSubmitting}
          register={register}
          onSubmit={onSubmit}
        />
      </Layout>
    </>
  );
};

export default CreateAlbumPage;
