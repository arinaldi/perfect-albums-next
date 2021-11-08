import { formatReleases, ListItem, sortByDate } from 'utils';
import useAuthStore from 'hooks/useAuthStore';
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

export default function NewReleases({
  data,
  onCreateOpen,
  onDeleteOpen,
  onEditOpen,
}: Props) {
  const user = useAuthStore((state) => state.user);

  const NewButton = user ? <Button onClick={onCreateOpen}>New</Button> : null;

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
}
