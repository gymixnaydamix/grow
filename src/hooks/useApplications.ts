import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useApplications() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data } = await apiClient.get('/applications');
      return data.data;
    },
  });

  const createApplication = useMutation({
    mutationFn: async (app: any) => {
      const { data } = await apiClient.post('/applications', app);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  });

  return { ...query, createApplication };
}
