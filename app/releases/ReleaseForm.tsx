import { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import SubmitButton from 'components/SubmitButton';
import { type ReleaseInput } from './schema';

interface Props {
  form: UseFormReturn<ReleaseInput, any>;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
}

export default function ReleaseForm({ form, isSubmitting, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="artist"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artist</FormLabel>
              <FormControl>
                <Input autoFocus {...field} />
              </FormControl>
              <FormDescription>The release artist</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The release title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>The release date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full sm:w-auto" submitting={isSubmitting} />
      </form>
    </Form>
  );
}
