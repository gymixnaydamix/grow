import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useKPIs() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['kpis'],
    queryFn: async () => {
      const { data } = await apiClient.get('/kpis');
      return data.data;
    },
  });

  return { ...query };
}
