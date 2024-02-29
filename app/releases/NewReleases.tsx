import { type User } from '@supabase/supabase-js';

import { formatReleases, sortByDate } from 'utils';
import { Release } from 'utils/types';
import AppLayout from 'components/AppLayout';
import { Badge } from 'components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import AddReleaseModal from './AddReleaseModal';
import DeleteReleaseModal from './DeleteReleaseModal';
import EditReleaseModal from './EditReleaseModal';

interface Props {
  releases: Release[];
  user: User | null;
}

export default function NewReleases({ releases, user }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>New releases</span>
          <Badge variant="secondary">{releases.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={user && <AddReleaseModal />}
    >
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle>{date}</CardTitle>
                <CardDescription>
                  {releases.length.toLocaleString()} release
                  {releases.length > 1 && 's'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul>
                  {releases.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-start justify-between gap-2 text-sm"
                    >
                      <span>
                        {r.artist} &ndash; {r.title}
                      </span>
                      {user && (
                        <span className="-mt-1.5 flex items-center gap-0.5">
                          <EditReleaseModal data={r} />
                          <DeleteReleaseModal data={r} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
      </div>
    </AppLayout>
  );
}
