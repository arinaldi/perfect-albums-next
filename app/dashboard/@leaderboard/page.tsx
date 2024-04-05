import { TextAlignTopIcon } from '@radix-ui/react-icons';

import { createClient } from 'utils/supabase/server';
import AppMessage from 'components/AppMessage';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';

interface Leaderboard {
  artist: string;
  count: number;
}

export default async function DashboardLeaderboard() {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('leaderboard');

  if (!data || error) return <AppMessage />;

  const items = data as unknown as Leaderboard[];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="font-semibold">Leaderboard</CardTitle>
          <TextAlignTopIcon className="size-4 text-muted-foreground" />
        </div>
        <CardDescription>Top 10 artists by release count</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-wider">
              <TableHead className="font-extrabold">Artist</TableHead>
              <TableHead className="text-right font-extrabold">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.artist}>
                <TableCell>{i.artist}</TableCell>
                <TableCell className="text-right">
                  {i.count.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
