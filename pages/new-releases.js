import useSWR from 'swr';
import { gql } from 'graphql-request';

import { formatReleases, sortByDate } from '../utils';
import { gqlFetcher } from '../utils/api';

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

function DateCol({ data, date }) {
  return (
    <div>
      <h4 className="text-xl font-semibold">
        {date}
      </h4>
      <ul data-testid={`list-${date}`} className="list-disc ml-6 p-1">
        {data.map(release => (
          <li key={release.id}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NewReleases ({ releases }) {
  const { data, error } = useSWR(GET_RELEASES, gqlFetcher, {
    initialData: { releases },
  });

  if (!data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          New Releases
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {Object.entries(formatReleases(data.releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <DateCol
              key={date}
              data={releases}
              date={date}
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
