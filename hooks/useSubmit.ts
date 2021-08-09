import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { MESSAGES } from 'constants/index';

type Callback = () => void;

export interface Options {
  callbacks: Callback[];
  submitFn: () => Promise<void>;
  successMessage: string;
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

      toast.success(successMessage);
    } catch (error) {
      setIsSubmitting(false);
      if (error?.message === MESSAGES.UNAUTHORIZED) return;

      toast.error(MESSAGES.ERROR);
    }
  };

  return { handleSubmit, isSubmitting };
}
