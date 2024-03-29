import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { BASE_URL } from '@/utils/constants';
import Random from './Random';

interface Payload {
  artists: string[];
  success: boolean;
}

export const metadata = {
  title: 'Artists | Perfect Albums',
};

export async function getArtists(): Promise<Payload> {
  const res = await fetch(`${BASE_URL}/api/artists`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function ArtistsPage() {
  const { artists } = await getArtists();

  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <ScrollArea className="h-[420px] rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium italic leading-none">
            {artists.length.toLocaleString()} artists
          </h4>
          {artists.map((a, index) => (
            <div key={a}>
              <p className="text-sm">{a}</p>
              {index !== artists.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="order-1 flex-1">
        <Random artists={artists} />
      </div>
    </div>
  );
}
