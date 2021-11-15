import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { MESSAGES, METHODS, ROUTES_ADMIN } from 'constants/index';
import useMutation from 'hooks/useMutation';
import useSubmit from 'hooks/useSubmit';
import { getTitle } from 'utils';
import { AlbumInput } from 'utils/types';
import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

export default function CreateAlbumPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: {
      year: new Date().getFullYear().toString(),
    },
  });
  const createAlbum = useMutation('/api/albums');

  const options = {
    callbacks: [
      () =>
        router.push({
          pathname: ROUTES_ADMIN.base.href,
          query: router.query,
        }),
    ],
    handleSubmit,
    submitFn: async (album: AlbumInput) => {
      await createAlbum({ body: album, method: METHODS.POST });
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
}
