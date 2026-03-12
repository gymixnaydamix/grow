import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useMessages() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data } = await apiClient.get('/messages');
      return data.data;
    },
  });

  const sendMessage = useMutation({
    mutationFn: async (message: any) => {
      const { data } = await apiClient.post('/messages', message);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages'] }),
  });

  return { ...query, sendMessage };
}
