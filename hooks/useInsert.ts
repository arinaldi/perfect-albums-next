import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useInsert(table: Table) {
  const supabase = useSupabaseClient();

  return async function (data: any) {
    const { error } = await supabase.from(table).insert([data]);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
