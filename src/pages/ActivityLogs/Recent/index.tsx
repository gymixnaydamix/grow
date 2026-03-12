import React from 'react';
import { Clock, Activity, Zap, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';

export default function Recent() {
  const { data: logs, isLoading } = useQuery({
    queryKey: ['recent-logs'],
    queryFn: async () => {
      const response = await axios.get('/all-logs');
      return response.data.data.slice(0, 10);
    }
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Clock className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Recent</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 shrink-0">Recent Activity</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base shrink-0">Last 10 system events.</p>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
               <div className="space-y-4">
                  {logs?.map((log: any) => (
                    <div key={log.id} className="p-4 border-l-4 border-indigo-500 bg-indigo-50/30 rounded-r-xl">
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className="font-bold text-gray-900">{log.action}: {log.entity_type}</h4>
                             <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">{new Date(log.created_at).toLocaleString()}</p>
                          </div>
                          <div className="text-[10px] font-mono text-indigo-400">ID: {log.id.slice(0, 8)}</div>
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
