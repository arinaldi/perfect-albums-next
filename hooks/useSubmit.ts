import { FormEvent, useState } from 'react';

import api from 'utils/api';
import {
  DISPATCH_TYPES,
  MESSAGES,
  TOAST_TYPES,
} from 'constants/index';
import { Values } from 'hooks/useForm';
import { Method } from 'utils/types';
import { useAppDispatch } from 'components/Provider';

type Callback = () => void;

interface Options {
  body: Values | null;
  callbacks: Callback[];
  method: Method;
  path: string;
  successMessage: string;
}

interface Payload {
  handleSubmit: (event: FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

export default function useSubmit(options: Options): Payload {
  const {
    body,
    callbacks,
    method,
    path,
    successMessage,
  } = options;
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await api(path, { body, dispatch, method });

      callbacks.forEach((callback: Callback) => {
        callback();
      });

      dispatch({
        payload: {
          message: successMessage,
          type: TOAST_TYPES.SUCCESS,
        },
        type: DISPATCH_TYPES.OPEN_TOAST,
      });
    } catch (err) {
      if (err.message !== MESSAGES.UNAUTHORIZED) {
        dispatch({
          payload: {
            message: MESSAGES.ERROR,
            type: TOAST_TYPES.ERROR,
          },
          type: DISPATCH_TYPES.OPEN_TOAST,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
}
