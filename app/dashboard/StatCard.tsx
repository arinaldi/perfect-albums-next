import { ReactNode } from 'react';
import {
  CalendarIcon,
  DiscIcon,
  LayersIcon,
  PersonIcon,
  RocketIcon,
  SpeakerModerateIcon,
} from '@radix-ui/react-icons';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type Variant =
  | 'artists'
  | 'cds'
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

const className = 'size-4 text-muted-foreground shrink-0';
const icons: Record<Variant, ReactNode> = {
  artists: <PersonIcon className={className} />,
  cds: <DiscIcon className={className} />,
  releases: <CalendarIcon className={className} />,
  songs: <SpeakerModerateIcon className={className} />,
  topAlbums: <RocketIcon className={className} />,
  totalAlbums: <LayersIcon className={className} />,
};

export default function StatCard(props: Props) {
  const { isLoading, title, value, variant } = props;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0 pb-2">
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
