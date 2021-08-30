import { FC } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import { MODAL_TYPES } from 'constants/index';
import dbConnect from 'lib/dbConnect';
import { getTitle, ListItem } from 'utils';
import { Release } from 'utils/types';
import { getReleases } from 'pages/api/releases';
import useStore from 'hooks/useStore';
import NewReleases from 'components/NewReleases';
import AppMessage from 'components/AppMessage';

interface Props {
  releases: Release[];
}

const NewReleasesPage: FC<Props> = ({ releases }) => {
  const openModal = useStore((state) => state.openModal);
  const { data, error } = useSWR('/api/releases', {
    fallbackData: { releases },
  });

  if (error || !data) return <AppMessage />;

  function handleCreateOpen() {
    openModal(MODAL_TYPES.NEW_RELEASE_CREATE);
  }

  function handleEditOpen(data: ListItem) {
    openModal(MODAL_TYPES.NEW_RELEASE_EDIT, data);
  }

  function handleDeleteOpen(data: ListItem) {
    openModal(MODAL_TYPES.NEW_RELEASE_DELETE, data);
  }

  return (
    <>
      <Head>
        <title>{getTitle('New Releases')}</title>
      </Head>
      <NewReleases
        data={data}
        onCreateOpen={handleCreateOpen}
        onDeleteOpen={handleDeleteOpen}
        onEditOpen={handleEditOpen}
      />
    </>
  );
};

export default NewReleasesPage;

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const releases = await getReleases();

  return {
    props: { releases },
    revalidate: 5,
  };
};
