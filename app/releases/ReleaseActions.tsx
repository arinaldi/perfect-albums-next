'use client';
import { useState } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

import { Release } from '@/utils/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteReleaseModal from './DeleteReleaseModal';
import EditReleaseModal from './EditReleaseModal';

interface Props {
  release: Release;
}

export default function ReleaseActions({ release }: Props) {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="-mr-1 -mt-1 size-8 shrink-0 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon className="size-4" />
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
        <EditReleaseModal onClose={onClose} release={release} />
        <DeleteReleaseModal onClose={onClose} release={release} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
