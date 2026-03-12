import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useSchedule() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['schedule'],
    queryFn: async () => {
      const { data } = await apiClient.get('/schedule');
      return data.data;
    },
  });

  return { ...query };
}
