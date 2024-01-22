'use client';
import {
  ElementRef,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { Cross1Icon } from '@radix-ui/react-icons';

import { Children } from 'utils/types';

interface ContextType {
  showToast: (text: string) => void;
}

const ToastContext = createContext<ContextType>({
  showToast: () => {
    throw new Error('You cannot call showToast() outside of a <ToastProvider>');
  },
});

export function useToast() {
  return useContext(ToastContext);
}

interface ToastState {
  id: string;
  text: string;
}

export function ToastProvider({ children }: Children) {
  const [messages, setMessages] = useState<ToastState[]>([]);

  const showToast = useCallback((text: string) => {
    setMessages((toasts) => [
      ...toasts,
      {
        id: window.crypto.randomUUID(),
        text,
      },
    ]);
  }, []);

  return (
    <RadixToast.Provider>
      <ToastContext.Provider value={{ showToast }}>
        {children}
      </ToastContext.Provider>
      <AnimatePresence mode="popLayout">
        {messages.map((toast) => (
          <Toast
            key={toast.id}
            onClose={() =>
              setMessages((toasts) => toasts.filter((t) => t.id !== toast.id))
            }
            text={toast.text}
          />
        ))}
      </AnimatePresence>

      <RadixToast.Viewport className="fixed right-4 top-4 flex w-80 flex-col-reverse gap-3 max-sm:top-20" />
    </RadixToast.Provider>
  );
}

interface ToastProps {
  onClose: () => void;
  text: string;
}

const Toast = forwardRef<ElementRef<typeof RadixToast.Root>, ToastProps>(
  (props, ref) => {
    const { onClose, text } = props;
    const margin = 16;
    const width = 320;

    return (
      <RadixToast.Root
        asChild
        duration={2500}
        forceMount
        onOpenChange={onClose}
        ref={ref}
      >
        <motion.li
          animate={{ x: 0 }}
          exit={{
            opacity: 0,
            zIndex: -1,
            transition: {
              opacity: {
                duration: 0.2,
              },
            },
          }}
          initial={{ x: width + margin }}
          layout
          style={{ width, WebkitTapHighlightColor: 'transparent' }}
          transition={{
            damping: 30,
            mass: 1,
            stiffness: 200,
            type: 'spring',
          }}
        >
          <div className="flex items-center justify-between overflow-hidden whitespace-nowrap rounded-lg border bg-white text-sm shadow-sm backdrop-blur dark:border-gray-900 dark:bg-gray-600 dark:text-white">
            <RadixToast.Description className="truncate p-4">
              {text}
            </RadixToast.Description>
            <RadixToast.Close className="border-l border-gray-200 p-4 text-gray-500 transition hover:text-gray-400 dark:border-gray-900 dark:text-gray-200 dark:hover:text-gray-100">
              <Cross1Icon className="h-4 w-4" />
            </RadixToast.Close>
          </div>
        </motion.li>
      </RadixToast.Root>
    );
  },
);

Toast.displayName = 'Toast';
