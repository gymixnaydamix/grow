import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useClasses() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data } = await apiClient.get('/classes');
      return data.data;
    },
  });

  const createClass = useMutation({
    mutationFn: async (cls: any) => {
      const { data } = await apiClient.post('/classes', cls);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classes'] }),
  });

  return { ...query, createClass };
}
