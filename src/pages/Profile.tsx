import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Shield, Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import apiClient from '../lib/api-client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await apiClient.get('/auth/me');
      return data.data;
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const response = await apiClient.patch('/auth/me', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: user ? { name: user.name, email: user.email } : undefined,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-10 bg-[#F4F5F7] overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
            <div className="w-24 h-24 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl font-bold shadow-inner">
              {user?.name?.[0] || user?.email?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 capitalize">
                  {user?.role}
                </span>
                <span className="text-sm text-gray-500">Member since {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit((data) => updateProfile.mutate(data))} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register('name')}
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {updateProfile.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
