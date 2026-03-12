import React from 'react';
import { Database, HardDrive, Cloud, Download, Trash2, AlertTriangle } from 'lucide-react';

export default function Data() {
  const handleExport = () => {
    window.location.href = '/api/exports/all';
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <Database className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Storage</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <HardDrive className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Backups</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Cloud className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Sync</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">Data Management</h1>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base xl:text-lg shrink-0">Manage backups, storage, and data retention.</p>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-[#645C9A]" />
                Export Data
              </h2>
              <p className="text-gray-600 text-sm">Download all your school's data in a structured format (JSON/CSV).</p>
              <button
                onClick={handleExport}
                className="px-6 py-2 bg-[#645C9A] text-white rounded-xl hover:bg-[#534b8a] transition-colors"
              >
                Start Full Export
              </button>
            </section>

            <div className="h-px bg-gray-100" />

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#645C9A]" />
                Automated Backups
              </h2>
              <div className="p-4 bg-blue-50 text-blue-700 rounded-xl flex items-start gap-3">
                <Cloud className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="text-sm">
                  Your data is backed up automatically every 24 hours to secure off-site storage.
                  Last successful backup: <strong>2 hours ago</strong>.
                </div>
              </div>
            </section>

            <div className="h-px bg-gray-100" />

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </h2>
              <div className="p-4 border border-red-100 rounded-xl space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Delete School Account</h4>
                  <p className="text-sm text-gray-500">Once you delete your school account, there is no going back. Please be certain.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                  Request Deletion
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
