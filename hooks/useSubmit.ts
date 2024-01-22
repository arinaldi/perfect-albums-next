import { FormEvent, useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { useToast } from 'components/Toast';
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

export function useSubmit(options: Options): Payload {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { callbacks, handleSubmit, submitFn, successMessage = '' } = options;
  const { showToast } = useToast();

  async function handler(data?: any) {
    try {
      setIsSubmitting(true);
      await submitFn(data);
      setIsSubmitting(false);

      callbacks?.forEach((c) => {
        c();
      });

      if (successMessage) {
        showToast(successMessage);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      let message: string = MESSAGES.ERROR;

      if (error?.info?.error) {
        message = error.info.error;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      showToast(message);
    }
  }

  return {
    isSubmitting,
    onSubmit: handleSubmit ? handleSubmit(handler) : handler,
  };
}
