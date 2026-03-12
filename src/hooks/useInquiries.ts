import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useInquiries() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const { data } = await apiClient.get('/inquiries');
      return data.data;
    },
  });

  const createInquiry = useMutation({
    mutationFn: async (inquiry: any) => {
      const { data } = await apiClient.post('/inquiries', inquiry);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inquiries'] }),
  });

  return { ...query, createInquiry };
}
