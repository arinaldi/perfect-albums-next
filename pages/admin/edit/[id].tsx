import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  supabaseServerClient,
  withAuthRequired,
} from '@supabase/supabase-auth-helpers/nextjs';

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

export const getServerSideProps = withAuthRequired({
  redirectTo: ROUTE_HREF.TOP_ALBUMS,
  async getServerSideProps(ctx) {
    const { data: album } = await supabaseServerClient(ctx)
      .from<Album>('albums')
      .select('*')
      .eq('id', ctx.params?.id as string)
      .single();

    return {
      props: { album },
    };
  },
});
