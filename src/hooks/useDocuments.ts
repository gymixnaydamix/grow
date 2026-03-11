import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const { data } = await apiClient.get('/concierge/documents');
      return data.data;
    },
  });
}

export function useIngestDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (doc: any) => {
      const { data } = await apiClient.post('/concierge/ingest', doc);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
}
