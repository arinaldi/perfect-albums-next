import supabase from 'utils/supabase';
import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useUpdate(table: Table) {
  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
