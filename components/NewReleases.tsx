import { FC } from 'react';

import { formatReleases, ListItem, sortByDate } from 'utils';
import { useAuth } from 'hooks/useAuth';
import { Release } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';
import NewReleaseList from 'components/NewReleaseList';

interface Props {
  data: {
    releases: Release[];
  };
  onCreateOpen: () => void;
  onDeleteOpen: (release: ListItem) => void;
  onEditOpen: (release: ListItem) => void;
}

const NewReleases: FC<Props> = ({
  data,
  onCreateOpen,
  onDeleteOpen,
  onEditOpen,
}) => {
  const { hasAuth } = useAuth();

  const NewButton = hasAuth ? (
    <Button onClick={onCreateOpen}>New</Button>
  ) : null;

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
