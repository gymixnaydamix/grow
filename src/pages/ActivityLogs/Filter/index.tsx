import React, { useState } from 'react';
import { Filter as FilterIcon, Search, Sliders, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import axios from '../../../lib/axios';

export default function Filter() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: logs, isLoading } = useQuery({
    queryKey: ['filtered-logs', searchTerm],
    queryFn: async () => {
      const response = await axios.get('/all-logs');
      if (!searchTerm) return response.data.data;
      return response.data.data.filter((l: any) =>
        l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.entity_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Search className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Search</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 shrink-0">Log Explorer</h1>

          <div className="relative mb-8 shrink-0">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input
               type="text"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               placeholder="Search by action or entity type (e.g. LOGIN, USER)..."
               className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none"
             />
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
               <div className="space-y-3">
                  {logs?.map((log: any) => (
                    <div key={log.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors flex justify-between items-center">
                       <div>
                          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase mr-3">{log.action}</span>
                          <span className="text-sm font-medium text-gray-800">{log.entity_type}</span>
                       </div>
                       <span className="text-xs text-gray-400">{new Date(log.created_at).toLocaleDateString()}</span>
                    </div>
                  ))}
                  {logs?.length === 0 && <div className="text-center py-10 text-gray-400 italic">No logs match your search.</div>}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
