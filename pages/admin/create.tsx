import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import useAdminState from 'hooks/useAdminState';
import useForm from 'hooks/useForm';
import useSubmit from 'hooks/useSubmit';
import { getTitle } from 'utils';
import api from 'utils/api';
import { AlbumInput } from 'utils/types';
import CreateAlbum from 'components/CreateAlbum';

const CreateAlbumPage: FC = () => {
  const router = useRouter();
  const { values, handleChange } = useForm<AlbumInput>({
    artist: '',
    title: '',
    year: new Date().getFullYear().toString(),
    cd: false,
    aotd: false,
    favorite: false,
    studio: false,
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
    submitFn: async () => {
      await api('/api/albums', { body: values, method: METHODS.POST });
    },
    successMessage: `${MESSAGES.ALBUM_PREFIX} created`,
  };
  const { handleSubmit, isSubmitting } = useSubmit(options);

  return (
    <>
      <Head>
        <title>{getTitle('Create Album')}</title>
      </Head>
      <CreateAlbum
        isSubmitting={isSubmitting}
        onChange={handleChange}
        onSubmit={handleSubmit}
        values={values as AlbumInput}
      />
    </>
  );
};

export default CreateAlbumPage;
