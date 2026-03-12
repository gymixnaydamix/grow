import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useGrades() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['grades'],
    queryFn: async () => {
      const { data } = await apiClient.get('/grades');
      return data.data;
    },
  });

  const updateGrade = useMutation({
    mutationFn: async (grade: any) => {
      const { data } = await apiClient.post('/grades', grade);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['grades'] }),
  });

  return { ...query, updateGrade };
}
