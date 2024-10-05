import { FormEvent, useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { toast } from 'sonner';

import { capitalizeFirstLetter } from 'utils';
import { MESSAGES } from 'utils/constants';
import { Callback } from 'utils/types';

export interface Options {
  callbacks?: Callback[];
  handleSubmit?: UseFormHandleSubmit<any>;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  submitting: boolean;
  onSubmit: (event: FormEvent) => Promise<void>;
}

export function useSubmit(options: Options): Payload {
  const [submitting, setSubmitting] = useState(false);
  const { callbacks, handleSubmit, submitFn, successMessage = '' } = options;

  async function handler(data?: any) {
    try {
      setSubmitting(true);
      await submitFn(data);
      setSubmitting(false);

      callbacks?.forEach((c) => {
        c();
      });

      if (successMessage) {
        toast.success(successMessage);
      }
    } catch (error: any) {
      setSubmitting(false);
      let message: string = MESSAGES.ERROR;

      if (error?.info?.error) {
        message = error.info.error;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast.error(capitalizeFirstLetter(message));
    }
  }

  return {
    onSubmit: handleSubmit ? handleSubmit(handler) : handler,
    submitting,
  };
}
