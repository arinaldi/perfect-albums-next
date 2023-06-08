import { useRouter } from 'next/navigation';

import { createClient } from 'utils/supabase-browser';
import { Table } from 'utils/types';

export default function useDelete(table: Table) {
  const router = useRouter();
  const supabase = createClient();

  return async function (id: number) {
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) throw error;

    router.refresh();
  };
}
