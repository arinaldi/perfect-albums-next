import { revalidateLiveQueries } from 'hooks/useAuthStore';
import supabase from 'utils/supabase';

export default function useInsert(table: string) {
  return async function (data: any) {
    const { error } = await supabase.from(table).insert([data]);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
