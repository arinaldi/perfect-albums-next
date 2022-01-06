import { revalidateLiveQueries } from 'hooks/useAuthStore';
import supabase from 'utils/supabase';

export default function useDelete(table: string) {
  return async function (id: number) {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
