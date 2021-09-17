import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { MESSAGES } from 'constants/index';
import { Callback } from 'utils/types';

export interface Options {
  callbacks: Callback[];
  submitFn: () => Promise<void>;
  successMessage?: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

export default function useSubmit(options: Options): Payload {
  const { callbacks, submitFn, successMessage } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await submitFn();
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
  };

  return { handleSubmit, isSubmitting };
}
