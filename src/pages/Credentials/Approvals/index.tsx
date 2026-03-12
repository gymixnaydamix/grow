import React from 'react';
import { CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';

export default function Approvals() {
  const { data: approvals, isLoading } = useQuery({
    queryKey: ['approvals'],
    queryFn: async () => {
      const response = await axios.get('/approvals');
      return response.data.data;
    }
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Clock className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">All</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 shrink-0">Approvals History</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base shrink-0">Review the log of administrative decisions.</p>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : approvals?.length === 0 ? (
               <div className="py-20 text-center text-gray-400 italic">No approval decisions recorded.</div>
            ) : (
               <div className="space-y-4">
                  {approvals?.map((log: any) => (
                    <div key={log.id} className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between hover:bg-gray-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${log.details.includes('Approved') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                             {log.details.includes('Approved') ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-gray-900">{log.details}</p>
                             <p className="text-xs text-gray-400 mt-1">Processor ID: {log.user_id.slice(0, 8)}</p>
                          </div>
                       </div>
                       <span className="text-xs text-gray-400">{new Date(log.created_at).toLocaleDateString()}</span>
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
