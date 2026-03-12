import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function usePayroll() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['payroll'],
    queryFn: async () => {
      const { data } = await apiClient.get('/payroll');
      return data.data;
    },
  });

  const runPayroll = useMutation({
    mutationFn: async (payroll: any) => {
      const { data } = await apiClient.post('/payroll', payroll);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['payroll'] }),
  });

  return { ...query, runPayroll };
}

export function useRecruitment() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['recruitment'],
    queryFn: async () => {
      const { data } = await apiClient.get('/recruitment');
      return data.data;
    },
  });

  const createJob = useMutation({
    mutationFn: async (job: any) => {
      const { data } = await apiClient.post('/recruitment', job);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recruitment'] }),
  });

  return { ...query, createJob };
}
