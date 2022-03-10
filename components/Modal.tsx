import { FormEvent, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import CancelButton from 'components/CancelButton';
import SubmitButton from 'components/SubmitButton';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<Element>) => void;
  title: string;
}

export default function Modal({
  children,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
  title,
}: Props) {
  const isDeleteModal = title.toLowerCase().includes('delete');

  return (
    <Transition appear as={Fragment} show={isOpen}>
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
            <div className="my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800">
              <Dialog.Title
                as="h3"
                className="p-6 pb-0 text-2xl font-semibold dark:text-white"
              >
                {title}
              </Dialog.Title>
              <form method="POST" onSubmit={onSubmit}>
                {children}
                <div className="flex items-center justify-end p-6 pt-0">
                  <CancelButton onClick={onClose} />
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
