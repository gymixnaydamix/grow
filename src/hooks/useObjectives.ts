import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useObjectives() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['objectives'],
    queryFn: async () => {
      const { data } = await apiClient.get('/objectives');
      return data.data;
    },
  });

  return { ...query };
}
