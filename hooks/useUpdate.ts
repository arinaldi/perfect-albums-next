import { useRouter } from 'next/navigation';

import { createClient } from 'utils/supabase-browser';
import { Table } from 'utils/types';

export default function useUpdate(table: Table) {
  const router = useRouter();
  const supabase = createClient();

  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    router.refresh();
  };
}
