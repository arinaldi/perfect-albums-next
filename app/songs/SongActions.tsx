'use client';
import { useRef, useState } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null);
  const focusRef = useRef<HTMLButtonElement | null>(null);

  function onDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function onDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);

    if (!open) {
      setDropdownOpen(false);
    }
  }

  return (
    <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 p-0" ref={dropdownTriggerRef} variant="ghost">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            event.preventDefault();
          }
        }}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <EditSongModal
          onOpenChange={onDialogItemOpenChange}
          onSelect={onDialogItemSelect}
          song={song}
        />
        <DeleteSongModal
          onOpenChange={onDialogItemOpenChange}
          onSelect={onDialogItemSelect}
          song={song}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
