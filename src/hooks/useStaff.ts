import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useLeaveRequests() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['leave-requests'],
    queryFn: async () => {
      const { data } = await apiClient.get('/leave');
      return data.data;
    },
  });

  const requestLeave = useMutation({
    mutationFn: async (leave: any) => {
      const { data } = await apiClient.post('/leave', leave);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['leave-requests'] }),
  });

  return { ...query, requestLeave };
}

export function useStaffDirectory() {
  return useQuery({
    queryKey: ['staff'],
    queryFn: async () => {
      const { data } = await apiClient.get('/users');
      return data.data;
    },
  });
}
