import { useRouter } from 'next/navigation';

import { useSupabase } from 'components/SupabaseProvider';
import { Table } from 'utils/types';

export default function useDelete(table: Table) {
  const router = useRouter();
  const { supabase } = useSupabase();

  return async function (id: number) {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    router.refresh();
  };
}
