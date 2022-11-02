import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useDelete(table: Table) {
  const supabase = useSupabaseClient();

  return async function (id: number) {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
