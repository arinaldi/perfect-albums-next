import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: 'Invalid password' }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export interface State {
  message: string | null;
}

export const initialState: State = {
  message: null,
};
