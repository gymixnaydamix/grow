import React from 'react';
import { TrendingUp, Activity, BarChart2, Loader2, ArrowUpRight } from 'lucide-react';
import { useKPIs } from '../../../hooks/useKPIs';

export default function KPIs() {
  const { data: kpis, isLoading } = useKPIs();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Metrics</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Activity className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Targets</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <BarChart2 className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Dashboards</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">KPIs</h1>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base xl:text-lg shrink-0">Monitor Key Performance Indicators.</p>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpis?.map((kpi: any) => (
                <div key={kpi.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900">{kpi.name}</h3>
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-indigo-600">{kpi.value}</span>
                    <span className="text-sm text-gray-500">{kpi.unit}</span>
                  </div>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Target: {kpi.target} {kpi.unit}</span>
                    <span>{Math.round((kpi.value / kpi.target) * 100)}%</span>
                  </div>
                </div>
              ))}
              {(!kpis || kpis.length === 0) && (
                <div className="col-span-full py-12 text-center text-gray-500 italic border border-dashed rounded-2xl">
                  No KPI metrics defined yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
