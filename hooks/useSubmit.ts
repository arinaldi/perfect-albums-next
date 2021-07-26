import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import api from 'utils/api';
import { MESSAGES, METHODS } from 'constants/index';
import { Values } from 'hooks/useForm';

type Callback = () => void;

export interface Options {
  body: Values | null;
  callbacks: Callback[];
  method: METHODS;
  path: string;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

export default function useSubmit(options: Options): Payload {
  const { body, callbacks, method, path, successMessage } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await api(path, { body, method });

      callbacks.forEach((callback: Callback) => {
        callback();
      });

      toast.success(successMessage);
    } catch (err) {
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        toast.error(MESSAGES.ERROR);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
}
