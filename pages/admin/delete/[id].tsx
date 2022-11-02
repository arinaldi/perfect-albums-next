import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { MESSAGES, ROUTE_HREF, ROUTES_ADMIN } from 'constants/index';
import { getTitle } from 'utils';
import { Album } from 'utils/types';
import useDelete from 'hooks/useDelete';
import useSubmit from 'hooks/useSubmit';
import DeleteAlbum from 'components/DeleteAlbum';

interface Props {
  album: Album;
}

export default function DeleteAlbumPage({ album }: Props) {
  const router = useRouter();
  const deleteAlbum = useDelete('albums');

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
      await deleteAlbum(album.id);
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
