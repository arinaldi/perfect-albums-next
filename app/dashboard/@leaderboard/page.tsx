import { cookies } from 'next/headers';

import Column from 'app/admin/Column';
import { createClient } from 'utils/supabase/server';
import AppMessage from 'components/AppMessage';

interface Leaderboard {
  artist: string;
  count: number;
}

export default async function DashboardLeaderboard() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.rpc('leaderboard');

  if (!data || error) return <AppMessage />;

  const items = (data as unknown as Leaderboard[]).filter(
    ({ artist }) => artist !== 'Various Artists',
  );

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 dark:border-black sm:rounded-lg">
            <table className="min-w-full table-auto divide-y divide-gray-200 dark:divide-black sm:table-fixed">
              <thead>
                <tr>
                  <Column wrapperClassName="sm:w-1/2">Artist</Column>
                  <Column wrapperClassName="sm:w-1/2">Count</Column>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-black dark:bg-gray-500">
                {items.map(({ artist, count }) => (
                  <tr
                    key={artist}
                    className="even:bg-gray-0 odd:bg-gray-50 dark:odd:bg-gray-700 dark:even:bg-gray-800"
                  >
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/4 sm:max-w-0 sm:truncate">
                      {artist}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900 dark:text-white sm:w-1/3 sm:max-w-0 sm:truncate">
                      {count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
