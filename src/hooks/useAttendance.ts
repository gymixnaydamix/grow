import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useAttendance() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['attendance'],
    queryFn: async () => {
      const { data } = await apiClient.get('/attendance');
      return data.data;
    },
  });

  const recordAttendance = useMutation({
    mutationFn: async (record: any) => {
      const { data } = await apiClient.post('/attendance', record);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['attendance'] }),
  });

  return { ...query, recordAttendance };
}
