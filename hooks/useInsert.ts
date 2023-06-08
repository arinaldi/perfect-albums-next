import { useRouter } from 'next/navigation';

import { createClient } from 'utils/supabase-browser';
import { Table } from 'utils/types';

export default function useInsert(table: Table) {
  const router = useRouter();
  const supabase = createClient();

  return async function (data: any) {
    const { error } = await supabase.from(table).insert(data);

    if (error) throw error;

    router.refresh();
  };
}
