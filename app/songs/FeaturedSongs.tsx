'use client';

import { useState } from 'react';
import { User } from '@supabase/auth-helpers-nextjs';
import { PlusSmallIcon, TrashIcon } from '@heroicons/react/24/outline';

import { MODAL_INITIAL_STATE, MODAL_TYPES } from 'utils/constants';
import { Song } from 'utils/types';
import AppLayout from 'components/AppLayout';
import ButtonWithIcon from 'components/ButtonWithIcon';
import CreateSongModal from 'app/songs/CreateSongModal';
import DeleteSongModal from 'app/songs/DeleteSongModal';

interface Props {
  songs: Song[];
  user: User | null;
}

interface ModalState {
  data: Song | null;
  type: MODAL_TYPES;
}

export default function FeaturedSongs({ songs, user }: Props) {
  const [modal, setModal] = useState<ModalState>(MODAL_INITIAL_STATE);

  function onClose() {
    setModal((modal) => ({ ...modal, type: MODAL_TYPES.INITIAL }));
  }

  return (
    <AppLayout
      title="Featured Songs"
      titleAction={
        user ? (
          <ButtonWithIcon
            icon={<PlusSmallIcon />}
            onClick={() => {
              setModal({
                data: null,
                type: MODAL_TYPES.FEATURED_SONGS_CREATE,
              });
            }}
          >
            New
          </ButtonWithIcon>
        ) : null
      }
    >
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <div
            className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-black dark:bg-gray-700"
            key={song.id}
          >
            <div className="mb-1 text-xl font-semibold dark:text-white">
              {song.title}
            </div>
            <div className="mb-2 text-gray-500 dark:text-white">
              {song.artist}
            </div>
            <div className="flex items-center gap-2">
              <a
                className="text-blue-700 hover:underline dark:text-blue-500"
                href={song.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen
              </a>
              {user ? (
                <span
                  className="cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                  onClick={() =>
                    setModal({
                      data: song,
                      type: MODAL_TYPES.FEATURED_SONGS_DELETE,
                    })
                  }
                >
                  <TrashIcon className="inline h-4 w-4" />
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <CreateSongModal
        isOpen={modal.type === MODAL_TYPES.FEATURED_SONGS_CREATE}
        onClose={onClose}
      />
      <DeleteSongModal
        data={modal.data}
        isOpen={modal.type === MODAL_TYPES.FEATURED_SONGS_DELETE}
        onClose={onClose}
      />
    </AppLayout>
  );
}
