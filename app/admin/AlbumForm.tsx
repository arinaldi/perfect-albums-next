import { FormEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/SubmitButton';
import { useMediaQuery } from '@/components/ui/use-media-query';
import { AlbumInput } from './schema';

interface Props {
  form: UseFormReturn<AlbumInput>;
  isSubmitting: boolean;
  onSubmit: (event: FormEvent<Element>) => Promise<void>;
}

export default function AlbumForm({ form, isSubmitting, onSubmit }: Props) {
  const isDesktop = useMediaQuery();

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
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studio"
          render={({ field }) => (
            <FormItem className="flex space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  name={field.name}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Studio</FormLabel>
                <FormDescription>Is this a studio album?</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cd"
          render={({ field }) => (
            <FormItem className="flex space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  name={field.name}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>CD</FormLabel>
                <FormDescription>Do you own this CD?</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="favorite"
          render={({ field }) => (
            <FormItem className="flex space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  name={field.name}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Favorite</FormLabel>
                <FormDescription>Is this a top album?</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <SubmitButton
          className="w-full sm:w-auto"
          size={isDesktop ? 'default' : 'lg'}
          submitting={isSubmitting}
        />
      </form>
    </Form>
  );
}
