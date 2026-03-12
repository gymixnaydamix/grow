import React, { useState } from 'react';
import { Award, TrendingUp, Filter, Download, MoreVertical, Loader2, ChevronRight } from 'lucide-react';
import { useGrades } from '../../../hooks/useGrades';

export default function Grades() {
  const { data: grades, isLoading } = useGrades();
  const [filter, setFilter] = useState('All');

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Award className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span></button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]"><TrendingUp className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Transcripts</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">My Grades</h1>
              <p className="text-gray-500 text-sm md:text-base">Monitor your academic performance and transcripts.</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
             {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
             ) : grades?.length === 0 ? (
               <div className="py-20 text-center text-gray-400 italic">No grades have been posted yet.</div>
             ) : (
               <div className="space-y-4">
                 {grades?.map((item: any) => (
                   <div key={item.id} className="p-5 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-indigo-200 transition-colors bg-gray-50/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-emerald-600 shadow-sm font-bold text-lg">
                           {item.grade}
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-900">Course ID: {item.course_id.slice(0, 8)}</h4>
                           <p className="text-xs text-gray-500 uppercase tracking-wider">Posted on {new Date(item.created_at).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"><ChevronRight className="w-5 h-5" /></button>
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
