import { z } from 'zod';

export const releaseSchema = z.object({
  artist: z.string().min(1).max(128),
  title: z.string().min(1).max(128),
  date: z.string().or(z.literal('')),
});

export type ReleaseInput = z.infer<typeof releaseSchema>;
