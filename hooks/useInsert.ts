import { useRouter } from 'next/navigation';

import supabase from 'utils/supabase';
import { Table } from 'utils/types';

export default function useInsert(table: Table) {
  const router = useRouter();

  return async function (data: any) {
    const { error } = await supabase.from(table).insert([data]);

    if (error) throw error;

    router.refresh();
  };
}
