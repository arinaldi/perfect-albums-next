import { FC, FormEvent, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import useStore from 'hooks/useStore';
import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<Element>) => void;
  title: string;
}

const Modal: FC<Props> = ({
  children,
  isSubmitting,
  onClose,
  onSubmit,
  title,
}) => {
  const isOpen = useStore((state) => state.isOpen);
  const isDeleteModal = title.toLowerCase().includes('delete');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          </Transition.Child>
          <span className="inline-block h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-gray-800">
              <Dialog.Title
                as="h3"
                className="text-2xl p-6 pb-0 font-semibold dark:text-white"
              >
                {title}
              </Dialog.Title>
              <form method="POST" onSubmit={onSubmit}>
                {children}
                <div className="flex items-center justify-end p-6 pt-0">
                  <CancelButton onClick={onClose} />
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    label={isDeleteModal ? 'Delete' : undefined}
                    loadingLabel={isDeleteModal ? 'Deleting...' : undefined}
                  />
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
