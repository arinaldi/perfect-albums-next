'use client';
import { useState } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Song } from 'utils/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteSongModal from './DeleteSongModal';
import EditSongModal from './EditSongModal';

interface Props {
  song: Song;
}

export default function SongActions({ song }: Props) {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditSongModal onClose={onClose} song={song} />
        <DeleteSongModal onClose={onClose} song={song} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
