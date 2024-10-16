import { type User } from '@supabase/supabase-js';

import { ReleaseResults } from '@/utils';
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
import ReleaseActions from './ReleaseActions';

interface Props {
  count: number;
  data: ReleaseResults;
  user: User | null;
}

export default function NewReleases({ count, data, user }: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>New releases</span>
          <Badge variant="secondary">{count.toLocaleString()}</Badge>
        </div>
      }
      titleAction={user && <AddReleaseModal />}
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {Object.entries(data)
          .sort((a, b) => {
            const dateA = a[0] === 'TBD' ? a[0] : new Date(a[0]).toISOString();
            const dateB = b[0] === 'TBD' ? b[0] : new Date(b[0]).toISOString();

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
          })
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
                <ul className="space-y-4">
                  {releases.map((r) => (
                    <li key={r.id} className="text-sm">
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="text-muted-foreground">
                            {r.artist} &ndash;
                          </span>{' '}
                          {r.title}
                        </span>
                        {user && <ReleaseActions release={r} />}
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
