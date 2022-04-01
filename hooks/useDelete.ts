import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useDelete(table: Table) {
  return async function (id: number) {
    const { error } = await supabaseClient.from(table).delete().eq('id', id);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
