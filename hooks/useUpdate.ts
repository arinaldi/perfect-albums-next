import { useRouter } from 'next/navigation';

import supabase from 'utils/supabase';
import { Table } from 'utils/types';

export default function useUpdate(table: Table) {
  const router = useRouter();

  return async function (id: number, data: any) {
    const { error } = await supabase.from(table).update(data).eq('id', id);

    if (error) throw error;

    router.refresh();
  };
}
