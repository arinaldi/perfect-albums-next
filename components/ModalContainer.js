import { MODAL_TYPES } from 'constants/index';
import { useAppState } from 'components/Provider';
import CreateReleaseModal from 'components/CreateReleaseModal';
import EditReleaseModal from 'components/EditReleaseModal';
import DeleteReleaseModal from 'components/DeleteReleaseModal';
import CreateSongModal from 'components/CreateSongModal';
import DeleteSongModal from 'components/DeleteSongModal';

export default function ModalContainer() {
  const { modal } = useAppState();

  switch (modal.type) {
    case MODAL_TYPES.NEW_RELEASE_CREATE:
      return <CreateReleaseModal />;
    case MODAL_TYPES.NEW_RELEASE_EDIT:
      return <EditReleaseModal />;
    case MODAL_TYPES.NEW_RELEASE_DELETE:
      return <DeleteReleaseModal />;
    case MODAL_TYPES.FEATURED_SONGS_CREATE:
      return <CreateSongModal />;
    case MODAL_TYPES.FEATURED_SONGS_DELETE:
      return <DeleteSongModal />;
    default:
      return null;
  }
}
