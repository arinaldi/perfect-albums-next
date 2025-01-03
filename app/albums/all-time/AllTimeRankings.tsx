import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SPOTIFY_URL } from 'utils/constants';
import { AllTimeListItem } from './edit/EditAllTimeRankings';
import EditButton from './EditButton';

interface Props {
  favorites: AllTimeListItem[];
}

export default function AllTimeRankings({ favorites }: Props) {
  return (
    <AppLayout
      className="max-w-md"
      title={
        <div className="flex items-center gap-2">
          <span>All-time albums</span>
          <Badge variant="secondary">{favorites.length.toLocaleString()}</Badge>
        </div>
      }
      titleAction={<EditButton />}
    >
      <Card>
        <CardContent className="pt-6">
          <ol className="ml-4 list-decimal space-y-1">
            {favorites.map((f, index) => {
              const query = encodeURI(`${f.artist} ${f.title}`);
              const url = `${SPOTIFY_URL}/${query}`;

              return (
                <li key={index} className="text-sm text-muted-foreground">
                  <span>{f.artist} &ndash;</span>{' '}
                  <a
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {f.title}
                  </a>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
