import { FC } from 'react';

import { formatReleases, sortByDate } from 'utils';
import { Release } from 'pages/new-releases';
import { useAppState } from 'components/Provider';
import Layout from 'components/Layout';
import NewReleaseList from 'components/NewReleaseList';

interface Props {
  data: {
    releases: Release[];
  };
  onCreateOpen: () => void;
  onDeleteOpen: (release: Release) => void;
  onEditOpen: (release: Release) => void;
}

const NewReleases: FC<Props> = ({ data, onCreateOpen, onDeleteOpen, onEditOpen }) => {
  const {
    isLoading,
    user: { isAuthenticated },
  } = useAppState();

  const NewButton = isAuthenticated && !isLoading
    ? (
      <button
        className="py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none disabled:opacity-50"
        onClick={onCreateOpen}
      >
        New
      </button>
    )
    : null;

  return (
    <Layout title="New Releases" titleAction={NewButton}>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatReleases(data.releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <NewReleaseList
              key={date}
              data={releases}
              date={date}
              onDelete={onDeleteOpen}
              onEdit={onEditOpen}
            />
          ))}
      </div>
    </Layout>
  );
};

export default NewReleases;
