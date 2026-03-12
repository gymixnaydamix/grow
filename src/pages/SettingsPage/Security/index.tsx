import React, { useState, useEffect } from 'react';
import { Shield, Lock, Key, Loader2, Save } from 'lucide-react';
import { useSecuritySettings } from '../../../hooks/useSettings';

export default function Security() {
  const { data: settings, isLoading, updateSettings, isUpdating } = useSecuritySettings();
  const [formData, setFormData] = useState({
    two_factor_enabled: false,
    password_expiry_days: 90,
    session_timeout_minutes: 30
  });

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#645C9A]" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <Shield className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Access</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Lock className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Passwords</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Key className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">2FA</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">Security</h1>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base xl:text-lg shrink-0">Configure authentication and access controls.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formData.two_factor_enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, two_factor_enabled: e.target.checked }))}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#645C9A]"></div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password Expiry (Days)</label>
                <input
                  type="number"
                  value={formData.password_expiry_days}
                  onChange={(e) => setFormData(prev => ({ ...prev, password_expiry_days: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#645C9A] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Session Timeout (Minutes)</label>
                <input
                  type="number"
                  value={formData.session_timeout_minutes}
                  onChange={(e) => setFormData(prev => ({ ...prev, session_timeout_minutes: parseInt(e.target.value) }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#645C9A] outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 px-6 py-2 bg-[#645C9A] text-white rounded-xl hover:bg-[#534b8a] transition-colors disabled:opacity-50"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Security Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
