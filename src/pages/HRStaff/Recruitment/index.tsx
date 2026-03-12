import React from 'react';
import { Search, UserPlus, MessageSquare, Loader2, Briefcase } from 'lucide-react';
import { useRecruitment } from '../../../hooks/useRecruitment';

export default function Recruitment() {
  const { data: openings, isLoading } = useRecruitment();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Openings</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <UserPlus className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Candidates</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Interviews</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">Recruitment</h1>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base xl:text-lg shrink-0">Manage job openings and candidate pipeline.</p>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {openings?.map((job: any) => (
                <div key={job.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{job.job_title}</h3>
                      <p className="text-sm text-gray-500">{job.department} • Posted {new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {job.status.toUpperCase()}
                  </span>
                </div>
              ))}
              {(!openings || openings.length === 0) && (
                <div className="py-20 text-center text-gray-500 italic border border-dashed rounded-3xl">
                  No active job openings found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
