import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';

import { MODAL_INITIAL_STATE, MODAL_TYPES } from 'constants/index';
import { useUser } from 'hooks/useAuthStore';
import { Song } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';
import CreateSongModal from 'components/CreateSongModal';
import DeleteSongModal from 'components/DeleteSongModal';

interface Props {
  data: Song[];
}

interface ModalState {
  data: Song | null;
  type: MODAL_TYPES;
}

export default function FeaturedSongs({ data }: Props) {
  const user = useUser();
  const [modal, setModal] = useState<ModalState>(MODAL_INITIAL_STATE);

  function onClose() {
    setModal((modal) => ({ ...modal, type: MODAL_TYPES.INITIAL }));
  }

  const NewButton = user ? (
    <Button
      onClick={() =>
        setModal({ data: null, type: MODAL_TYPES.FEATURED_SONGS_CREATE })
      }
    >
      New
    </Button>
  ) : null;

  return (
    <Layout title="Featured Songs" titleAction={NewButton}>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((song) => (
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
            <div>
              <a
                className="text-blue-600 dark:text-blue-500"
                href={song.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                Listen
              </a>
              {user ? (
                <span
                  className="ml-2 cursor-pointer dark:text-white"
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
    </Layout>
  );
}
