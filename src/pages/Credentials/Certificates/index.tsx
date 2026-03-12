import React from 'react';
import { FileBadge, Award, Archive, Plus, Search, Loader2 } from 'lucide-react';
import { useCertificates } from '../../../hooks/useCertificates';

export default function Certificates() {
  const { data: certificates, isLoading } = useCertificates();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <FileBadge className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Issued</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Award className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Templates</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Archive className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Revoked</span>
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Certificates</h1>
              <p className="text-gray-500 text-sm md:text-base">Manage and issue student certificates.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              Issue New
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
            {isLoading ? (
              <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>
            ) : certificates?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 italic">
                <FileBadge className="w-16 h-16 mb-4 opacity-10" />
                <p>No certificates issued yet</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Type</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Issue Date</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {certificates?.map((cert: any) => (
                    <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900 uppercase tracking-wide text-xs">{cert.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{cert.student_id.slice(0, 8)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{new Date(cert.issue_date).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          cert.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                          {cert.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
