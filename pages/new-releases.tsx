import { FC } from 'react';
import { GetStaticProps } from 'next';
import useSWR from 'swr';

import { DISPATCH_TYPES, MODAL_TYPES } from 'constants/index';
import { fetcher } from 'utils/api';
import dbConnect from 'lib/dbConnect';
import { ListItem } from 'utils';
import { Release } from 'utils/types';
import { getReleases } from 'pages/api/releases';
import { useAppDispatch } from 'components/Provider';
import NewReleases from 'components/NewReleases';
import AppMessage from 'components/AppMessage';

interface Props {
  releases: Release[];
}

const NewReleasesPage: FC<Props> = ({ releases }) => {
  const dispatch = useAppDispatch();
  const { data, error } = useSWR('/api/releases', fetcher, {
    initialData: { releases },
  });

  if (error) return <AppMessage />;

  function handleCreateOpen() {
    dispatch({
      payload: {
        type: MODAL_TYPES.NEW_RELEASE_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  function handleEditOpen(data: ListItem) {
    dispatch({
      payload: {
        data,
        type: MODAL_TYPES.NEW_RELEASE_EDIT,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  function handleDeleteOpen(data: ListItem) {
    dispatch({
      payload: {
        data,
        type: MODAL_TYPES.NEW_RELEASE_DELETE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  return (
    <NewReleases
      data={data}
      onCreateOpen={handleCreateOpen}
      onDeleteOpen={handleDeleteOpen}
      onEditOpen={handleEditOpen}
    />
  );
};

export default NewReleasesPage;

export const getStaticProps: GetStaticProps = async () => {
  await dbConnect();
  const releases = await getReleases();

  return {
    props: { releases },
  };
};
