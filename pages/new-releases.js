import useSWR from 'swr';
import { gql } from 'graphql-request';

import { DISPATCH_TYPES, ICONS, MODAL_TYPES } from 'constants/index';
import { formatReleases, sortByDate } from 'utils';
import { gqlFetcher } from 'utils/api';
import { useApp } from 'components/Provider';

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

function DateCol({ data, date, onDelete, onEdit }) {
  const [state] = useApp();
  const {
    isLoading,
    user: { isAuthenticated },
  } = state;

  return (
    <div>
      <h4 className="text-xl font-semibold">{date}</h4>
      <ul data-testid={`list-${date}`} className="list-disc ml-6 p-1">
        {data.map(release => (
          <li key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {isAuthenticated && !isLoading && (
              <>
                <span
                  className="align-middle cursor-pointer ml-2"
                  onClick={() => onEdit(release)}
                >
                  {ICONS.PENCIL}
                </span>
                <span
                  className="align-middle cursor-pointer"
                  onClick={() => onDelete(release)}
                >
                  {ICONS.X}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NewReleases({ releases }) {
  const [state, dispatch] = useApp();
  const {
    isLoading,
    user: { isAuthenticated },
  } = state;
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
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">New Releases</h1>
        {isAuthenticated && !isLoading && (
          <button
            className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
            onClick={handleCreateOpen}
          >
            New
          </button>
        )}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatReleases(data.releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <DateCol
              key={date}
              data={releases}
              date={date}
              onDelete={handleDeleteOpen}
              onEdit={handleEditOpen}
            />
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { releases } = await gqlFetcher(GET_RELEASES);
  return {
    props: { releases },
  };
}
