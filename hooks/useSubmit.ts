import { FormEvent, useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import toast from 'react-hot-toast';

import { MESSAGES } from 'utils/constants';
import { Callback, SupaError } from 'utils/types';

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
      const message = (error as SupaError).message || MESSAGES.ERROR;
      toast.error(message);
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
