import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useUpdate(table: Table) {
  return async function (id: number, data: any) {
    const { error } = await supabaseClient
      .from(table)
      .update(data)
      .eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
