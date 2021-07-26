import { FC } from 'react';

import { MODAL_TYPES } from 'constants/index';
import useStore from 'hooks/useStore';
import CreateSongModal from 'components/CreateSongModal';
import DeleteSongModal from 'components/DeleteSongModal';
import CreateReleaseModal from 'components/CreateReleaseModal';
import EditReleaseModal from 'components/EditReleaseModal';
import DeleteReleaseModal from 'components/DeleteReleaseModal';

const ModalContainer: FC = () => {
  const type = useStore((state) => state.type);

  switch (type) {
    case MODAL_TYPES.FEATURED_SONGS_CREATE:
      return <CreateSongModal />;
    case MODAL_TYPES.FEATURED_SONGS_DELETE:
      return <DeleteSongModal />;
    case MODAL_TYPES.NEW_RELEASE_CREATE:
      return <CreateReleaseModal />;
    case MODAL_TYPES.NEW_RELEASE_EDIT:
      return <EditReleaseModal />;
    case MODAL_TYPES.NEW_RELEASE_DELETE:
      return <DeleteReleaseModal />;
    default:
      return null;
  }
};

export default ModalContainer;
