import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().trim().email(),
});

export type EmailInput = z.infer<typeof emailSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(3, { message: 'Invalid password' }),
});

export type SignInInput = z.infer<typeof signInSchema>;

export const verifyOtpSchema = z.object({
  code: z.string().trim().length(6, { message: 'Invalid code' }),
  email: z.string().trim().email(),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export interface State {
  message: string;
}

export const initialState: State = {
  message: '',
};
