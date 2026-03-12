import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Loader2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useSchedule } from '../../../hooks/useSchedule';

export default function Schedule() {
  const { data: scheduleItems, isLoading } = useSchedule();
  const [view, setView] = useState<'Day' | 'Week'>('Week');

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button onClick={() => setView('Week')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${view === 'Week' ? 'text-white' : 'hover:text-white'}`}><Calendar className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Week</span></button>
          <button onClick={() => setView('Day')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${view === 'Day' ? 'text-white' : 'hover:text-white'}`}><Clock className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Today</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-2xl font-bold text-gray-900">Academic Schedule</h2>
            <div className="flex items-center gap-2">
               <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
               <span className="text-sm font-bold text-gray-700 mx-2">October 23 - 29, 2023</span>
               <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : scheduleItems?.length === 0 ? (
               <div className="py-20 text-center text-gray-400 italic">No classes scheduled for this period.</div>
            ) : (
               <div className="space-y-4">
                  {scheduleItems?.map((item: any) => (
                    <div key={item.id} className="p-4 border border-gray-100 rounded-2xl bg-gray-50/30 flex items-center justify-between group hover:border-indigo-200 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-indigo-600 shadow-sm">
                            <Clock className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{item.schedule}</p>
                            <h4 className="font-bold text-gray-900">Course ID: {item.course_id.slice(0, 8)}</h4>
                         </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                         <MapPin className="w-4 h-4" />
                         <span className="text-sm">{item.room}</span>
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
