import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useRecruitment() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['recruitment'],
    queryFn: async () => {
      const { data } = await apiClient.get('/recruitment');
      return data.data;
    },
  });

  return { ...query };
}
