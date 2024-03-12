import { ReactNode } from 'react';
import {
  CalendarIcon,
  DiscIcon,
  RocketIcon,
  SpeakerModerateIcon,
  StackIcon,
} from '@radix-ui/react-icons';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Variant =
  | 'cds'
  | 'leaderboard'
  | 'releases'
  | 'songs'
  | 'topAlbums'
  | 'totalAlbums';

interface Props {
  isLoading?: boolean;
  title: string;
  value: string;
  variant: Variant;
}

const className = 'size-4 text-muted-foreground';
const icons: Record<Variant, ReactNode> = {
  cds: <DiscIcon className={className} />,
  leaderboard: <DiscIcon className={className} />,
  releases: <CalendarIcon className={className} />,
  songs: <SpeakerModerateIcon className={className} />,
  topAlbums: <RocketIcon className={className} />,
  totalAlbums: <StackIcon className={className} />,
};

export default function StatCard(props: Props) {
  const { isLoading, title, value, variant } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0.5 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icons[variant]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? <Skeleton className="mt-1 h-7 w-1/2" /> : value}
        </div>
      </CardContent>
    </Card>
  );
}
