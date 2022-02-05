import supabase from 'utils/supabase';
import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useDelete(table: Table) {
  return async function (id: number) {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
