import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

import { Table } from 'utils/types';
import { revalidateLiveQueries } from 'components/SWRProvider';

export default function useInsert(table: Table) {
  return async function (data: any) {
    const { error } = await supabaseClient.from(table).insert([data]);

    if (error) throw error;

    await revalidateLiveQueries();
  };
}
