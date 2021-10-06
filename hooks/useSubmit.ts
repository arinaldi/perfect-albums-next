import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { UseFormHandleSubmit } from 'react-hook-form';

import { MESSAGES } from 'constants/index';
import { Callback } from 'utils/types';

export interface Options {
  callbacks: Callback[];
  handleSubmit?: UseFormHandleSubmit<any>;
  submitFn: (data?: any) => Promise<void>;
  successMessage?: string;
}

interface Payload {
  isSubmitting: boolean;
  onSubmit: (event: FormEvent) => Promise<void>;
}

export default function useSubmit(options: Options): Payload {
  const { callbacks, handleSubmit, submitFn, successMessage } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handler(data?: any) {
    try {
      setIsSubmitting(true);
      await submitFn(data);
      setIsSubmitting(false);
      callbacks.forEach((callback: Callback) => {
        callback();
      });

      if (successMessage) {
        toast.success(successMessage);
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof Error && error.message === MESSAGES.UNAUTHORIZED) {
        return;
      }

      toast.error(MESSAGES.ERROR);
    }
  }

  async function formSubmit(event: FormEvent) {
    event.preventDefault();
    await handler();
  }

  return {
    isSubmitting,
    onSubmit: handleSubmit ? handleSubmit(handler) : formSubmit,
  };
}
