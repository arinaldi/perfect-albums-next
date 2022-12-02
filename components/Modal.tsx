'use client';

import { FormEvent, Fragment, ReactNode, useRef } from 'react';
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
  const cancelButtonRef = useRef(null);

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      as={Fragment}
    >
      <Dialog
        className="fixed inset-0"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 p-4">
          <Dialog.Panel className="mx-auto w-full max-w-lg rounded-2xl bg-white text-left shadow-xl dark:bg-gray-800">
            <Dialog.Title
              as="h3"
              className="p-6 pb-0 text-2xl font-semibold dark:text-white"
            >
              {title}
            </Dialog.Title>
            <form method="POST" onSubmit={onSubmit}>
              {children}
              <div className="flex items-center justify-end p-6 pt-0">
                <CancelButton onClick={onClose} ref={cancelButtonRef} />
                <span className="ml-1" />
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}
