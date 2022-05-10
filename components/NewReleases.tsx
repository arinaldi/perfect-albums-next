import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';

import { MODAL_INITIAL_STATE, MODAL_TYPES } from 'constants/index';
import { useUser } from 'hooks/useAuthStore';
import { formatReleases, sortByDate } from 'utils';
import { Release } from 'utils/types';
import Layout from 'components/Layout';
import Button from 'components/Button';
import CreateReleaseModal from 'components/CreateReleaseModal';
import DeleteReleaseModal from 'components/DeleteReleaseModal';
import EditReleaseModal from 'components/EditReleaseModal';

interface Props {
  data: Release[];
}

interface ModalState {
  data: Release | null;
  type: MODAL_TYPES;
}

export default function NewReleases({ data }: Props) {
  const user = useUser();
  const [modal, setModal] = useState<ModalState>(MODAL_INITIAL_STATE);

  function onClose() {
    setModal((modal) => ({ ...modal, type: MODAL_TYPES.INITIAL }));
  }

  const NewButton = user ? (
    <Button
      onClick={() =>
        setModal({
          data: null,
          type: MODAL_TYPES.NEW_RELEASE_CREATE,
        })
      }
    >
      New
    </Button>
  ) : null;

  return (
    <Layout title="New Releases" titleAction={NewButton}>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(formatReleases(data))
          .sort(sortByDate)
          .map(([date, releases]) => (
            <div key={date}>
              <h4 className="text-xl font-semibold dark:text-white">{date}</h4>
              <ul data-testid={`list-${date}`} className="ml-6 list-disc p-1">
                {releases.map((release) => (
                  <li key={release.id} className="dark:text-white">
                    <span>
                      {release.artist} &ndash; {release.title}
                    </span>
                    {user && (
                      <>
                        <PencilIcon
                          className="ml-2 inline h-4 w-4 cursor-pointer dark:text-white"
                          onClick={() =>
                            setModal({
                              data: release,
                              type: MODAL_TYPES.NEW_RELEASE_EDIT,
                            })
                          }
                        />
                        <TrashIcon
                          className="ml-2 inline h-4 w-4 cursor-pointer dark:text-white"
                          onClick={() =>
                            setModal({
                              data: release,
                              type: MODAL_TYPES.NEW_RELEASE_DELETE,
                            })
                          }
                        />
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
    </Layout>
  );
}
