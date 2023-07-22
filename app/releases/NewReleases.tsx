'use client';
import { Session } from '@supabase/auth-helpers-nextjs';

import { formatReleases, sortByDate } from 'utils';
import { Release } from 'utils/types';
import AppLayout from 'components/AppLayout';
import CreateReleaseModal from 'app/releases/CreateReleaseModal';
import DeleteReleaseModal from 'app/releases/DeleteReleaseModal';
import EditReleaseModal from 'app/releases/EditReleaseModal';

interface Props {
  releases: Release[];
  session: Session | null;
}

export default function NewReleases({ releases, session }: Props) {
  return (
    <AppLayout
      title="New Releases"
      titleAction={session && <CreateReleaseModal />}
    >
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <div
              key={date}
              className="rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-900 dark:bg-gray-700"
            >
              <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-900">
                <h3 className="text-lg font-semibold leading-6 dark:text-white">
                  {date}
                </h3>
              </div>
              <ul>
                {releases.map((release) => (
                  <li
                    key={release.id}
                    className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-2.5 last:border-b-0 dark:border-gray-900 dark:text-white"
                  >
                    <span>
                      {release.artist} &ndash; {release.title}
                    </span>
                    {session && (
                      <span className="flex items-center gap-2">
                        <EditReleaseModal data={release} />
                        <DeleteReleaseModal data={release} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </AppLayout>
  );
}
