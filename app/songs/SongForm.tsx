import { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { cn } from '@/lib/utils';
import { type SongInput } from './schema';

interface Props {
  className?: string;
  form: UseFormReturn<SongInput>;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
}

export default function SongForm({
  className,
  form,
  isSubmitting,
  onSubmit,
}: Props) {
  return (
    <Form {...form}>
      <form className={cn('space-y-8', className)} onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full sm:w-auto" submitting={isSubmitting} />
      </form>
    </Form>
  );
}
