import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(3, { message: 'Invalid password' }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export interface State {
  message: string;
}

export const initialState: State = {
  message: '',
};
