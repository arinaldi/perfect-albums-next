import { CheckIcon, DiscIcon } from '@radix-ui/react-icons';

import AppLayout from '@/components/AppLayout';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { PER_PAGE } from '@/utils/constants';
import { Album, StudioValue } from '@/utils/types';
import AddAlbumButton from './AddAlbumButton';
import DataEmptyPlaceholder from './DataEmptyPlaceholder';
import Paginate from './Paginate';
import Search from './Search';
import SortableColumn from './SortableColumn';
import TableActions from './TableActions';

interface Props {
  albums: Album[];
  cdTotal: number;
  perPage: PER_PAGE;
  studio: StudioValue;
  total: number;
}

export default function Admin({
  albums,
  cdTotal,
  perPage,
  studio,
  total,
}: Props) {
  return (
    <AppLayout
      title={
        <div className="flex items-center gap-2">
          <span>Admin</span>
          <Badge variant="secondary">{total.toLocaleString()}</Badge>
        </div>
      }
      titleAction={
        <div className="flex items-center gap-4 dark:text-white">
          <code className="font-mono text-xs">
            {process.env.NEXT_PUBLIC_APP_VERSION}
          </code>
          <span className="flex items-center gap-0.5">
            <Badge variant="secondary">{cdTotal.toLocaleString()}</Badge>
            <span className="text-sm leading-7">
              CD{cdTotal === 1 ? '' : 's'}
            </span>
          </span>
        </div>
      }
    >
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Search autoFocus type="artist" />
        <Search type="title" />
        <AddAlbumButton />
      </div>

      {albums?.length === 0 ? (
        <div className="flex justify-center">
          <DataEmptyPlaceholder />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-wider">
              <SortableColumn prop="artist">Artist</SortableColumn>
              <SortableColumn prop="title">Title</SortableColumn>
              <SortableColumn prop="year">Year</SortableColumn>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.artist}</TableCell>
                <TableCell>
                  {a.cd && <DiscIcon className="mb-0.5 mr-1 inline size-4" />}
                  <span
                    className={cn(
                      a.studio ? 'font-medium' : 'font-light',
                      a.favorite ? 'italic' : '',
                    )}
                  >
                    {a.title}
                  </span>
                  {a.favorite && (
                    <CheckIcon className="mb-0.5 ml-1 inline size-4" />
                  )}
                </TableCell>
                <TableCell>{a.year}</TableCell>
                <TableCell className="text-right">
                  <TableActions id={a.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <Paginate perPage={perPage} total={total} studio={studio} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </AppLayout>
  );
}
