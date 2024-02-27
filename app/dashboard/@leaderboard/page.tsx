import { cookies } from 'next/headers';

import { createClient } from 'utils/supabase/server';
import AppMessage from 'components/AppMessage';
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
  const supabase = createClient(cookies());
  const { data, error } = await supabase.rpc('leaderboard');

  if (!data || error) return <AppMessage />;

  const items = data as unknown as Leaderboard[];

  return (
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
  );
}
