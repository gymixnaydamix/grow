import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export interface Course {
  id: string;
  name: string;
  code: string;
  teacher_id?: string;
  created_at: string;
}

export function useCourses() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data } = await apiClient.get('/courses');
      return data.data as Course[];
    },
  });

  const createCourse = useMutation({
    mutationFn: async (newCourse: Omit<Course, 'id' | 'created_at'>) => {
      const { data } = await apiClient.post('/courses', newCourse);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return {
    ...query,
    createCourse,
  };
}
