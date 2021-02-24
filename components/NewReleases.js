import { ICONS } from 'constants/index';
import { formatReleases, sortByDate } from 'utils';
import { useAppState } from 'components/Provider';
import Layout from 'components/Layout';

function DateCol({ data, date, onDelete, onEdit }) {
  const {
    isLoading,
    user: { isAuthenticated },
  } = useAppState();

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

export default function NewReleases({ data, onCreateOpen, onDeleteOpen, onEditOpen }) {
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
            <DateCol
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
