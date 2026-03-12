import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axios';

export interface GeneralSettings {
  school_name: string;
  contact_email: string;
  phone_number: string;
  address: string;
  academic_year: string;
}

export interface SecuritySettings {
  two_factor_enabled: boolean;
  password_expiry_days: number;
  session_timeout_minutes: number;
}

export interface LocalizationSettings {
  timezone: string;
  date_format: string;
  currency: string;
  language: string;
}

export function useGeneralSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['settings', 'general'],
    queryFn: async () => {
      const response = await axios.get('/settings/general');
      return response.data as GeneralSettings;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: GeneralSettings) => {
      const response = await axios.post('/settings/general', newSettings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'general'] });
    },
  });

  return { ...query, updateSettings: mutation.mutate, isUpdating: mutation.isPending };
}

export function useSecuritySettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['settings', 'security'],
    queryFn: async () => {
      const response = await axios.get('/settings/security');
      return response.data as SecuritySettings;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: SecuritySettings) => {
      const response = await axios.post('/settings/security', newSettings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'security'] });
    },
  });

  return { ...query, updateSettings: mutation.mutate, isUpdating: mutation.isPending };
}

export function useLocalizationSettings() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['settings', 'localization'],
    queryFn: async () => {
      const response = await axios.get('/settings/localization');
      return response.data as LocalizationSettings;
    },
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: LocalizationSettings) => {
      const response = await axios.post('/settings/localization', newSettings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings', 'localization'] });
    },
  });

  return { ...query, updateSettings: mutation.mutate, isUpdating: mutation.isPending };
}
