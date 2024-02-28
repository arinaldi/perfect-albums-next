import { CheckIcon } from '@radix-ui/react-icons';

import { PER_PAGE } from 'utils/constants';
import { Album } from 'utils/types';
import Layout from 'components/AppLayout';
import AppMessage from 'components/AppMessage';
import { Badge } from 'components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
import AddAlbumButton from './AddAlbumButton';
import AlbumActions from './AlbumActions';
import Paginate from './Paginate';
import PerPage from './PerPage';
import Search from './Search';
import SortableColumn from './SortableColumn';
import StudioFilter from './StudioFilter';

interface Props {
  albums: Album[];
  cdTotal: number;
  perPage: PER_PAGE;
  studio: string;
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
    <Layout
      title={<Title total={total} />}
      titleAction={<AppMetadata cdTotal={cdTotal} />}
    >
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Search autoFocus type="artist" />
        <Search type="title" />
        <AddAlbumButton />
      </div>

      <div className="mb-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <Paginate total={total} />
        <PerPage perPage={perPage} />
        <StudioFilter studio={studio} />
      </div>

      {albums?.length === 0 ? (
        <div className="flex justify-center">
          <AppMessage
            description="Modify your search query"
            title="No results found"
            variant="default"
          />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-wider">
              <SortableColumn prop="artist">Artist</SortableColumn>
              <SortableColumn prop="title">Title</SortableColumn>
              <SortableColumn prop="year">Year</SortableColumn>
              <TableHead className="font-extrabold">Favorite</TableHead>
              <TableHead className="font-extrabold" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {albums.map((a) => (
              <TableRow key={a.id}>
                <TableCell>{a.artist}</TableCell>
                <TableCell>
                  {a.cd && <span className="mr-1 text-xs">💿</span>}
                  <span
                    className={a.studio ? 'font-medium italic' : 'font-light'}
                  >
                    {a.title}
                  </span>
                </TableCell>
                <TableCell>{a.year}</TableCell>
                <TableCell>
                  {a.favorite && <CheckIcon className="inline size-5" />}
                </TableCell>
                <TableCell>
                  <AlbumActions id={a.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Layout>
  );
}

interface TitleProps {
  total: number;
}

function Title({ total }: TitleProps) {
  return (
    <div className="flex items-center gap-2">
      <span>Admin</span>
      <Badge variant="secondary">{total.toLocaleString()}</Badge>
    </div>
  );
}

interface MetadataProps {
  cdTotal: number;
}

function AppMetadata({ cdTotal }: MetadataProps) {
  return (
    <div className="flex items-center gap-4 dark:text-white">
      <code className="font-mono text-xs">
        {process.env.NEXT_PUBLIC_APP_VERSION}
      </code>
      <span className="flex items-center gap-0.5">
        <Badge variant="secondary">{cdTotal.toLocaleString()}</Badge>
        <span className="text-sm leading-7">CD{cdTotal === 1 ? '' : 's'}</span>
      </span>
    </div>
  );
}
