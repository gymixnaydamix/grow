import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useMilestones() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['milestones'],
    queryFn: async () => {
      const { data } = await apiClient.get('/milestones');
      return data.data;
    },
  });

  const createMilestone = useMutation({
    mutationFn: async (milestone: any) => {
      const { data } = await apiClient.post('/milestones', milestone);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['milestones'] }),
  });

  return { ...query, createMilestone };
}

export function useProgress() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const { data } = await apiClient.get('/progress');
      return data.data;
    },
  });

  const recordProgress = useMutation({
    mutationFn: async (progress: any) => {
      const { data } = await apiClient.post('/progress', progress);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['progress'] }),
  });

  return { ...query, recordProgress };
}
