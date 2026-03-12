import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../lib/api-client';

export function useTransportation() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['transportation'],
    queryFn: async () => {
      const { data } = await apiClient.get('/transportation');
      return data.data;
    },
  });

  const updateTransportation = useMutation({
    mutationFn: async (item: any) => {
      const { data } = await apiClient.post('/transportation', item);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['transportation'] }),
  });

  return { ...query, updateTransportation };
}

export function useInventory() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data } = await apiClient.get('/inventory');
      return data.data;
    },
  });

  const updateInventory = useMutation({
    mutationFn: async (item: any) => {
      const { data } = await apiClient.post('/inventory', item);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inventory'] }),
  });

  return { ...query, updateInventory };
}

export function useFacilities() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      const { data } = await apiClient.get('/facilities');
      return data.data;
    },
  });

  const updateFacilities = useMutation({
    mutationFn: async (item: any) => {
      const { data } = await apiClient.post('/facilities', item);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['facilities'] }),
  });

  return { ...query, updateFacilities };
}

export function useAnnouncements() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data } = await apiClient.get('/announcements');
      return data.data;
    },
  });

  const createAnnouncement = useMutation({
    mutationFn: async (item: any) => {
      const { data } = await apiClient.post('/announcements', item);
      return data.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['announcements'] }),
  });

  return { ...query, createAnnouncement };
}
