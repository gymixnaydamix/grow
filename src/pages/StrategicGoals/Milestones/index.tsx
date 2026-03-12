import React, { useState } from 'react';
import { Flag, Calendar, CheckSquare, Plus, Loader2 } from 'lucide-react';
import { useMilestones } from '../../../hooks/useStrategic';

export default function Milestones() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const { data: milestones, isLoading } = useMilestones();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      );
    }

    const filteredMilestones = milestones?.filter((m: any) => {
      if (activeTab === 'Achieved') return m.status === 'Completed';
      return m.status !== 'Completed';
    });

    return (
      <div className="space-y-4 overflow-y-auto pb-4">
        {filteredMilestones?.map((milestone: any) => (
          <div key={milestone.id} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${milestone.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <Flag className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{milestone.title}</h3>
                <p className="text-sm text-gray-500">{milestone.description}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                   <Calendar className="w-3.5 h-3.5" />
                   Due: {new Date(milestone.due_date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${milestone.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {milestone.status}
            </span>
          </div>
        ))}
        {(!filteredMilestones || filteredMilestones.length === 0) && (
           <div className="py-20 text-center text-gray-400 italic">No {activeTab.toLowerCase()} milestones found.</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button onClick={() => setActiveTab('Upcoming')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Upcoming' ? 'text-white' : 'hover:text-white'}`}><Flag className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Upcoming</span></button>
          <button onClick={() => setActiveTab('Achieved')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Achieved' ? 'text-white' : 'hover:text-white'}`}><CheckSquare className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Achieved</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Milestones</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4" />New Milestone</button>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
