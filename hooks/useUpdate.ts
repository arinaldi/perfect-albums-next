import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useUpdate(table: Table) {
  const supabase = useSupabaseClient();

  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
