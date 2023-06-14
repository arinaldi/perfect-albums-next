'use client';
import { useState } from 'react';
import { Session } from '@supabase/auth-helpers-nextjs';
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
import CreateReleaseModal from 'app/releases/CreateReleaseModal';
import DeleteReleaseModal from 'app/releases/DeleteReleaseModal';
import EditReleaseModal from 'app/releases/EditReleaseModal';

interface Props {
  releases: Release[];
  session: Session | null;
}

interface ModalState {
  data: Release | null;
  type: MODAL_TYPES;
}

export default function NewReleases({ releases, session }: Props) {
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
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(releases))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <div
              key={date}
              className="rounded-md border border-gray-200 bg-white shadow-sm dark:border-gray-900 dark:bg-gray-700"
            >
              <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-900">
                <h3 className="text-lg font-semibold leading-6 dark:text-white">
                  {date}
                </h3>
              </div>
              <ul>
                {releases.map((release) => (
                  <li
                    key={release.id}
                    className="flex items-start justify-between gap-3 border-b border-gray-200 px-4 py-2.5 last:border-b-0 dark:border-gray-900 dark:text-white"
                  >
                    <span>
                      {release.artist} &ndash; {release.title}
                    </span>
                    {session && (
                      <span className="-mt-1 flex items-center">
                        <span
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
                          onClick={() =>
                            setModal({
                              data: release,
                              type: MODAL_TYPES.NEW_RELEASE_EDIT,
                            })
                          }
                        >
                          <PencilIcon className="inline h-6 w-6 p-1" />
                        </span>
                        <span
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900"
                          onClick={() =>
                            setModal({
                              data: release,
                              type: MODAL_TYPES.NEW_RELEASE_DELETE,
                            })
                          }
                        >
                          <TrashIcon className="inline h-6 w-6 p-1" />
                        </span>
                      </span>
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
