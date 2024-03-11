import { z } from 'zod';

export const albumSchema = z.object({
  id: z.string().optional(),
  artist: z.string().min(1).max(128),
  title: z.string().min(1).max(128),
  year: z.coerce.number().gte(1900).lte(2100),
  studio: z.coerce.boolean(),
  cd: z.coerce.boolean(),
  favorite: z.coerce.boolean(),
});

export type AlbumInput = z.infer<typeof albumSchema>;

export const deleteAlbumSchema = z.object({
  id: z.string(),
});

export type DeleteAlbumInput = z.infer<typeof deleteAlbumSchema>;

export interface State {
  message: string;
}

export const initialState: State = {
  message: '',
};
