import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useAssignments() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['assignments'],
    queryFn: async () => {
      const { data } = await apiClient.get('/assignments');
      return data.data;
    },
  });

  const createAssignment = useMutation({
    mutationFn: async (assignment: any) => {
      const { data } = await apiClient.post('/assignments', assignment);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['assignments'] }),
  });

  return { ...query, createAssignment };
}
