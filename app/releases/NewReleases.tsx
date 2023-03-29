'use client';

import { useState } from 'react';
import {
  PencilIcon,
  PlusSmallIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { MODAL_INITIAL_STATE, MODAL_TYPES } from 'utils/constants';
import { formatReleases, sortByDate } from 'utils';
import { Release } from 'utils/types';
import AppLayout from 'components/AppLayout';
import ButtonWithIcon from 'components/ButtonWithIcon';
import { useSupabase } from 'components/SupabaseProvider';
import CreateReleaseModal from 'app/releases/CreateReleaseModal';
import DeleteReleaseModal from 'app/releases/DeleteReleaseModal';
import EditReleaseModal from 'app/releases/EditReleaseModal';

interface Props {
  releases: Release[];
}

interface ModalState {
  data: Release | null;
  type: MODAL_TYPES;
}

export default function NewReleases({ releases }: Props) {
  const { session } = useSupabase();
  const [modal, setModal] = useState<ModalState>(MODAL_INITIAL_STATE);

  function onClose() {
    setModal((modal) => ({ ...modal, type: MODAL_TYPES.INITIAL }));
  }

  return (
    <AppLayout
      title="New Releases"
      titleAction={
        session ? (
          <ButtonWithIcon
            icon={<PlusSmallIcon />}
            onClick={() => {
              setModal({
                data: null,
                type: MODAL_TYPES.NEW_RELEASE_CREATE,
              });
            }}
          >
            New
          </ButtonWithIcon>
        ) : null
      }
    >
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <div key={date}>
              <h4 className="text-xl font-semibold dark:text-white">{date}</h4>
              <ul className="ml-6 list-disc p-1">
                {releases.map((release) => (
                  <li key={release.id} className="dark:text-white">
                    <span>
                      {release.artist} &ndash; {release.title}
                    </span>
                    {session && (
                      <>
                        <span
                          className="ml-1 cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
                          onClick={() =>
                            setModal({
                              data: release,
                              type: MODAL_TYPES.NEW_RELEASE_EDIT,
                            })
                          }
                        >
                          <PencilIcon className="inline h-4 w-4" />
                        </span>
                        <span className="cursor-pointer rounded-md p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900">
                          <TrashIcon
                            className="inline h-4 w-4"
                            onClick={() =>
                              setModal({
                                data: release,
                                type: MODAL_TYPES.NEW_RELEASE_DELETE,
                              })
                            }
                          />
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <CreateReleaseModal
        isOpen={modal.type === MODAL_TYPES.NEW_RELEASE_CREATE}
        onClose={onClose}
      />
      <EditReleaseModal
        data={modal.data}
        isOpen={modal.type === MODAL_TYPES.NEW_RELEASE_EDIT}
        onClose={onClose}
      />
      <DeleteReleaseModal
        data={modal.data}
        isOpen={modal.type === MODAL_TYPES.NEW_RELEASE_DELETE}
        onClose={onClose}
      />
    </AppLayout>
  );
}
