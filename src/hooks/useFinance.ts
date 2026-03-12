import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useBudgets() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const { data } = await apiClient.get('/budget');
      return data.data;
    },
  });

  const updateBudget = useMutation({
    mutationFn: async (budget: any) => {
      const { data } = await apiClient.post('/budget', budget);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] }),
  });

  return { ...query, updateBudget };
}
