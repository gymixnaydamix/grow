import React, { useState } from 'react';
import { Building, Map, Key, Plus, Search, Filter, MoreVertical, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useFacilities } from '../../../hooks/useAdminOps';

interface FacilitiesProps {
  activeSubPage: string;
}

export default function Facilities({ activeSubPage }: FacilitiesProps) {
  const [activeTab, setActiveTab] = useState('Buildings');
  const { data: facilities, isLoading } = useFacilities();

  const renderContent = () => {
    switch (activeTab) {
      case 'Spaces':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Spaces & Rooms</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Space
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {isLoading ? (
                 <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : facilities?.length === 0 ? (
                 <div className="col-span-full py-12 text-center text-gray-500 italic">No facilities recorded</div>
              ) : (
                facilities?.map((facility: any, i: number) => (
                  <div key={facility.id} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Map className="w-5 h-5" />
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100`}>
                        {facility.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{facility.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{facility.type}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-400">ID: {facility.id.slice(0, 8)}</span>
                      <button className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Manage</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case 'Access':
        return (
          <div className="flex-1 flex flex-col min-h-0">
             <div className="flex items-center justify-between mb-6 shrink-0 text-gray-400 italic">Access control module is currently in read-only mode for audit.</div>
          </div>
        );
      case 'Buildings':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Campus Overview</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Building
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border border-dashed text-gray-400">
               <Building className="w-12 h-12 mb-4 opacity-20" />
               <p>Use the Spaces tab to manage specific rooms and facilities.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button onClick={() => setActiveTab('Buildings')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Buildings' ? 'text-white' : 'hover:text-white'}`}><Building className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Buildings</span></button>
          <button onClick={() => setActiveTab('Spaces')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Spaces' ? 'text-white' : 'hover:text-white'}`}><Map className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Spaces</span></button>
          <button onClick={() => setActiveTab('Access')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Access' ? 'text-white' : 'hover:text-white'}`}><Key className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Access</span></button>
        </div>
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{activeSubPage}</h1>
              <p className="text-gray-500 text-sm md:text-base xl:text-lg">Manage campus buildings, rooms, and access control.</p>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
