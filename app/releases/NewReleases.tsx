import { type User } from '@supabase/supabase-js';

import { formatReleases, sortByDate } from '@/utils';
import { Release } from '@/utils/types';
import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
                <ul className="ml-4 list-disc space-y-2">
                  {releases.map((r) => (
                    <li key={r.id} className="text-sm">
                      <span className="flex items-center justify-between gap-4">
                        <span>
                          <span className="text-muted-foreground">
                            {r.artist} &ndash;
                          </span>{' '}
                          {r.title}
                        </span>
                        {user && (
                          <span className="flex gap-2">
                            <EditReleaseModal release={r} />
                            <DeleteReleaseModal release={r} />
                          </span>
                        )}
                      </span>
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
