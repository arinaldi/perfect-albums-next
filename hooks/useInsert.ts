import supabase from 'utils/supabase';
import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useInsert(table: Table) {
  return async function (data: any) {
    const { error } = await supabase.from(table).insert([data]);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
