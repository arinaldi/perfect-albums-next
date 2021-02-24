import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, MODAL_TYPES } from 'constants/index';
import { gqlFetcher } from 'utils/api';
import { useAppDispatch } from 'components/Provider';
import NewReleases from 'components/NewReleases';

export const GET_RELEASES = gql`
  {
    releases {
      id
      artist
      title
      date
    }
  }
`;

export default function NewReleasesPage({ releases }) {
  const dispatch = useAppDispatch();
  const { data, error } = useSWR(GET_RELEASES, gqlFetcher, {
    initialData: { releases },
  });

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  function handleCreateOpen() {
    dispatch({
      payload: {
        type: MODAL_TYPES.NEW_RELEASE_CREATE,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  function handleEditOpen(data) {
    dispatch({
      payload: {
        data: { ...data, dataType: 'Release' },
        type: MODAL_TYPES.NEW_RELEASE_EDIT,
      },
      type: DISPATCH_TYPES.OPEN_MODAL,
    });
  }

  function handleDeleteOpen(data) {
    dispatch({
      payload: {
        data: { ...data, dataType: 'Release' },
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
}

export async function getStaticProps() {
  const { releases } = await gqlFetcher(GET_RELEASES);
  return {
    props: { releases },
  };
}
