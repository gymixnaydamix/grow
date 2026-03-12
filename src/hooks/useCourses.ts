import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useCourses() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await apiClient.get('/courses');
      return data.data;
    },
  });

  const createCourse = useMutation({
    mutationFn: async (course: any) => {
      const { data } = await apiClient.post('/courses', course);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });

  return { ...query, createCourse };
}
