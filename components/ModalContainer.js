import { MODAL_TYPES } from '../constants';
import { useAppState } from './Provider';
import CreateReleaseModal from './CreateReleaseModal';
import EditReleaseModal from './EditReleaseModal';
import DeleteReleaseModal from './DeleteReleaseModal';

export default function ModalContainer() {
  const { modal } = useAppState();

  switch (modal.type) {
  case MODAL_TYPES.NEW_RELEASE_CREATE:
    return <CreateReleaseModal />;
  case MODAL_TYPES.NEW_RELEASE_EDIT:
    return <EditReleaseModal />;
  case MODAL_TYPES.NEW_RELEASE_DELETE:
    return <DeleteReleaseModal />;
  default:
    return null;
  }
}
