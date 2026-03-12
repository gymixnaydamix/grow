import React from 'react';
import { FileQuestion, CheckSquare, Shield, Loader2, Calendar, Clock } from 'lucide-react';
import { useLeaveRequests } from '../../../hooks/useStaff';

export default function Leave() {
  const { data: requests, isLoading } = useLeaveRequests();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><FileQuestion className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Requests</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 shrink-0">Leave Management</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base shrink-0">Manage employee leave requests and balances.</p>

          <div className="flex-1 overflow-y-auto">
             {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
             ) : requests?.length === 0 ? (
                <div className="py-20 text-center text-gray-400 italic">No leave requests found.</div>
             ) : (
                <div className="space-y-4">
                   {requests?.map((req: any) => (
                     <div key={req.id} className="p-5 border border-gray-100 rounded-2xl bg-gray-50/20 hover:border-indigo-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm"><Calendar className="w-5 h-5" /></div>
                              <div>
                                 <h4 className="font-bold text-gray-900 uppercase text-xs tracking-widest">{req.type} Leave</h4>
                                 <p className="text-sm text-gray-600 font-medium">User ID: {req.user_id.slice(0, 8)}</p>
                              </div>
                           </div>
                           <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase rounded border border-amber-100">{req.status}</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                           <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {req.start_date} to {req.end_date}</div>
                        </div>
                        <p className="text-sm text-gray-700 italic border-l-4 border-gray-200 pl-4 bg-gray-100/50 py-2 rounded-r-xl">"{req.reason}"</p>
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
