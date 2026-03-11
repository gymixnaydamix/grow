import React, { useState } from 'react';
import { LayoutDashboard, Activity, BarChart } from 'lucide-react';
import Overview from './Dashboard/Overview';
import Metrics from './Dashboard/Metrics';
import Analytics from './Dashboard/Analytics';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'metrics' | 'analytics'>('overview');

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#F4F5F7]">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 py-4 md:py-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-white rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 md:gap-2 transition-all min-w-[60px] ${activeTab === 'overview' ? 'text-indigo-600 scale-110' : 'hover:text-gray-900'}`}
          >
            <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('metrics')}
            className={`flex flex-col items-center gap-1 md:gap-2 transition-all min-w-[60px] ${activeTab === 'metrics' ? 'text-indigo-600 scale-110' : 'hover:text-gray-900'}`}
          >
            <Activity className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight">Metrics</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center gap-1 md:gap-2 transition-all min-w-[60px] ${activeTab === 'analytics' ? 'text-indigo-600 scale-110' : 'hover:text-gray-900'}`}
          >
            <BarChart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-center leading-tight">Analytics</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {activeTab === 'overview' && <Overview />}
          {activeTab === 'metrics' && <Metrics />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
}
