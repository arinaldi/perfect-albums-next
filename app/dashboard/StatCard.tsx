import {
  CalendarIcon,
  DiscIcon,
  GitPullRequestIcon,
  LayersIcon,
  RocketIcon,
  UserIcon,
  Volume1Icon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Icon } from '@/utils/types';

type Variant =
  | 'artists'
  | 'cds'
  | 'releases'
  | 'songs'
  | 'topAlbums'
  | 'totalAlbums'
  | 'version';

interface Props {
  isLoading?: boolean;
  title: string;
  value: string;
  variant: Variant;
}

const icons: Record<Variant, Icon> = {
  artists: UserIcon,
  cds: DiscIcon,
  releases: CalendarIcon,
  songs: Volume1Icon,
  topAlbums: RocketIcon,
  totalAlbums: LayersIcon,
  version: GitPullRequestIcon,
};

export default function StatCard(props: Props) {
  const { isLoading, title, value, variant } = props;
  const IconComponent = icons[variant];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="size-4 shrink-0 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="mt-1 h-7 w-1/2" /> : value}
        </div>
      </CardContent>
    </Card>
  );
}
