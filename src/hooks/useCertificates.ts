import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useCertificates() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['certificates'],
    queryFn: async () => {
      const { data } = await apiClient.get('/certificates');
      return data.data;
    },
  });

  const issueCertificate = useMutation({
    mutationFn: async (certificate: any) => {
      const { data } = await apiClient.post('/certificates', certificate);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['certificates'] }),
  });

  return { ...query, issueCertificate };
}
