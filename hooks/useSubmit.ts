import { FormEvent, useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';

import { useToast } from 'components/ui/use-toast';
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
  const { toast } = useToast();

  async function handler(data?: any) {
    try {
      setIsSubmitting(true);
      await submitFn(data);
      setIsSubmitting(false);

      callbacks?.forEach((c) => {
        c();
      });

      if (successMessage) {
        toast({
          description: successMessage,
          title: 'Success',
        });
      }
    } catch (error: any) {
      setIsSubmitting(false);
      let message: string = MESSAGES.ERROR;

      if (error?.info?.error) {
        message = error.info.error;
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      toast({
        description: message,
        title: 'Error',
      });
    }
  }

  return {
    isSubmitting,
    onSubmit: handleSubmit ? handleSubmit(handler) : handler,
  };
}
