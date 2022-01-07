import { revalidateLiveQueries } from 'hooks/useAuthStore';
import supabase from 'utils/supabase';

export default function useUpdate(table: string) {
  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
