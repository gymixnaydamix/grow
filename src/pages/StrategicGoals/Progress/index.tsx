import React from 'react';
import { BarChart, PieChart, LineChart, Loader2, Clock } from 'lucide-react';
import { useProgress } from '../../../hooks/useStrategic';

export default function Progress() {
  const { data: progressRecords, isLoading } = useProgress();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <BarChart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overall</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">Progress Log</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base xl:text-lg shrink-0">Audit history of strategic goal updates.</p>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : progressRecords?.length === 0 ? (
               <div className="py-20 text-center text-gray-400 italic">No progress records found.</div>
            ) : (
               <div className="space-y-4">
                  {progressRecords?.map((record: any) => (
                    <div key={record.id} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                       <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                             <Clock className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="text-sm text-gray-800 font-medium">{record.details}</p>
                             <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">{new Date(record.created_at).toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
