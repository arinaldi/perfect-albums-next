import { FormEvent, useTransition } from 'react';
import toast from 'react-hot-toast';
import { UseFormHandleSubmit } from 'react-hook-form';

import { MESSAGES } from 'utils/constants';
import { Callback } from 'utils/types';

export interface Options {
  callbacks?: Callback[];
  handleSubmit?: UseFormHandleSubmit<any>;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => Promise<void>;
}

export function useServerAction(options: Options): Payload {
  const [isPending, startTransition] = useTransition();
  const { callbacks, handleSubmit, submitFn, successMessage = '' } = options;

  async function handler(data?: any) {
    startTransition(async () => {
      try {
        await submitFn(data);

        callbacks?.forEach((c) => {
          c();
        });

        if (successMessage) {
          toast.success(successMessage);
        }
      } catch (error: any) {
        let message: string = MESSAGES.ERROR;

        if (error?.info?.error) {
          message = error.info.error;
        } else if (error instanceof Error && error.message) {
          message = error.message;
        }

        toast.error(message);
      }
    });
  }

  return {
    isSubmitting: isPending,
    onSubmit: handleSubmit ? handleSubmit(handler) : handler,
  };
}
