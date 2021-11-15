import { revalidateLiveQueries } from 'hooks/useAuthStore';
import api from 'utils/api';

export default function useApiMutation(path: string) {
  return async function (data: any) {
    await api(path, data);
    await revalidateLiveQueries();
  };
}
