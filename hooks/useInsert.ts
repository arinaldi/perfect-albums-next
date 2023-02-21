import { useRouter } from 'next/navigation';

import { Table } from 'utils/types';
import { useSupabase } from 'components/SupabaseProvider';

export default function useInsert(table: Table) {
  const router = useRouter();
  const { supabase } = useSupabase();

  return async function (data: any) {
    const { error } = await supabase.from(table).insert([data]);

    if (error) throw error;

    router.refresh();
  };
}
