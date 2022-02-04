import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { formatReleases, ListItem, sortByDate } from 'utils';
import useAuthStore from 'hooks/useAuthStore';
import { Release } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';

interface Props {
  data: Release[];
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(data))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <div key={date}>
              <h4 className="text-xl font-semibold dark:text-white">{date}</h4>
              <ul data-testid={`list-${date}`} className="ml-6 list-disc p-1">
                {releases.map((release) => (
                  <li key={release.id} className="dark:text-white">
                    <span>
                      {release.artist} &ndash; {release.title}
                    </span>
                    {user && (
                      <>
                        <PencilIcon
                          className="ml-2 inline h-4 w-4 cursor-pointer dark:text-white"
                          onClick={() => onEditOpen(release)}
                        />
                        <TrashIcon
                          className="ml-2 inline h-4 w-4 cursor-pointer dark:text-white"
                          onClick={() => onDeleteOpen(release)}
                        />
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </Layout>
  );
}
