'use client';

import { useState } from 'react';
import { PlusSmallIcon, TrashIcon } from '@heroicons/react/24/outline';

import { MODAL_INITIAL_STATE, MODAL_TYPES } from 'utils/constants';
import { Song } from 'utils/types';
import AppLayout from 'components/AppLayout';
import ButtonWithIcon from 'components/ButtonWithIcon';
import { useSupabase } from 'components/SupabaseProvider';
import CreateSongModal from 'app/songs/CreateSongModal';
import DeleteSongModal from 'app/songs/DeleteSongModal';

interface Props {
  songs: Song[];
}

interface ModalState {
  data: Song | null;
  type: MODAL_TYPES;
}

export default function FeaturedSongs({ songs }: Props) {
  const { session } = useSupabase();
  const [modal, setModal] = useState<ModalState>(MODAL_INITIAL_STATE);

  function onClose() {
    setModal((modal) => ({ ...modal, type: MODAL_TYPES.INITIAL }));
  }

  return (
    <AppLayout
      title="Featured Songs"
      titleAction={
        session ? (
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
      <dl className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <div
            className="rounded-md bg-white px-5 py-3 shadow dark:border-black dark:bg-gray-700"
            key={song.id}
          >
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                {song.artist}
              </dt>
              {session ? (
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
            <a
              className="text-blue-700 hover:underline dark:text-blue-500"
              href={song.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              <dd className="-mt-1 text-xl font-medium">{song.title}</dd>
            </a>
          </div>
        ))}
      </dl>
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
