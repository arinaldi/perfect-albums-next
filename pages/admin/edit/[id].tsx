import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useForm } from 'react-hook-form';

import { MESSAGES, ROUTE_HREF, ROUTES_ADMIN } from 'constants/index';
import { getTitle } from 'utils';
import { Album, AlbumInput } from 'utils/types';
import useUpdate from 'hooks/useUpdate';
import useSubmit from 'hooks/useSubmit';
import Layout from 'components/Layout';
import AlbumForm from 'components/AlbumForm';

interface Props {
  album: Album;
}

export default function EditAlbumPage({ album }: Props) {
  const router = useRouter();
  const { handleSubmit, register } = useForm<AlbumInput>({
    defaultValues: album,
  });
  const editAlbum = useUpdate('albums');

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
    handleSubmit,
    submitFn: async (data: AlbumInput) => {
      await editAlbum(album.id, data);
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
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createServerSupabaseClient(context);

  if (!context.params?.id) {
    return {
      redirect: {
        destination: ROUTE_HREF.TOP_ALBUMS,
        permanent: false,
      },
    };
  }

  const { data: album } = await supabase
    .from('albums')
    .select('*')
    .eq('id', context.params.id as string)
    .single();

  return {
    props: { album },
  };
}
