import { useRouter } from 'next/navigation';

import { Table } from 'utils/types';
import { useSupabase } from 'components/SupabaseProvider';

export default function useUpdate(table: Table) {
  const router = useRouter();
  const { supabase } = useSupabase();

  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    router.refresh();
  };
}
