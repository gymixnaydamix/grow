import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useBadges() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['badges'],
    queryFn: async () => {
      const { data } = await apiClient.get('/badges');
      return data.data;
    },
  });

  return { ...query };
}
