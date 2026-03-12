import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export interface Invoice {
  id: string;
  student_id: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  due_date: string;
  created_at: string;
}

export function useInvoices() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data } = await apiClient.get('/invoices');
      return data.data as Invoice[];
    },
  });

  const createInvoice = useMutation({
    mutationFn: async (newInvoice: Omit<Invoice, 'id' | 'created_at'>) => {
      const { data } = await apiClient.post('/invoices', newInvoice);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  return {
    ...query,
    createInvoice,
  };
}
