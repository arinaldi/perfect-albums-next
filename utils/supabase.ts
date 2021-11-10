import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default supabase;

export async function decodeSupabaseToken(token: string) {
  try {
    const { error, user } = await supabase.auth.api.getUser(token);

    if (error) throw error;

    return user;
  } catch (error) {
    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
    return null;
  }
}
