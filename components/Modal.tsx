import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

export default function Modal({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

function ModalContent({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-w-lg w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-gray-800 px-6 py-4 shadow data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
        <div className="flex items-center justify-between">
          <Dialog.Title className="text-xl font-medium dark:text-white">
            {title}
          </Dialog.Title>
          <Dialog.Close className="text-gray-400 hover:text-gray-500">
            <Cross1Icon />
          </Dialog.Close>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;
