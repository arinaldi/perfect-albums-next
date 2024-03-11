import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

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
import { MESSAGES } from '@/utils/constants';
import { AlbumInput, State, initialState } from './schema';

interface Props {
  action: (state: State, formData: FormData) => Promise<State>;
  form: UseFormReturn<AlbumInput>;
  id?: number;
}

export default function AlbumForm({ action, form, id }: Props) {
  const [state, formAction] = useFormState(action, initialState);
  const isDesktop = useMediaQuery();

  useEffect(() => {
    if (!state.message) return;

    toast.error(state.message);
  }, [state]);

  async function actionWithValidation(formData: FormData) {
    const valid = await form.trigger();

    if (!valid) {
      toast.error(MESSAGES.ERROR);
      return;
    }

    if (id) {
      formData.append('id', id.toString());
    }

    formAction(formData);
  }

  return (
    <Form {...form}>
      <form action={actionWithValidation} className="space-y-8">
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
        />
      </form>
    </Form>
  );
}
