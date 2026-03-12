import React, { useState } from 'react';
import { ClipboardList, CheckCircle, BarChart, Search, Filter, MoreVertical, FileText, Download, ChevronRight, Loader2 } from 'lucide-react';
import { useGrades } from '../../../hooks/useGrades';

export default function Grading() {
  const [activeTab, setActiveTab] = useState('Pending');
  const { data: grades, isLoading } = useGrades();

  const renderContent = () => {
    switch (activeTab) {
      case 'Completed':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Completed Grading</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search submissions..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Course ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Grade</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500" /></td>
                    </tr>
                  ) : grades?.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-500 italic">No grades recorded</td>
                    </tr>
                  ) : (
                    grades?.map((item: any, i: number) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-6 font-medium text-gray-900">{item.student_id.slice(0, 8)}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{item.course_id.slice(0, 8)}</td>
                        <td className="py-4 px-6 font-medium text-emerald-600">{item.grade}</td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Edit Grade</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Reports':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Grade Reports</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4" />
                Export All
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center h-64 border border-dashed rounded-3xl text-gray-400">
               <BarChart className="w-12 h-12 mb-4 opacity-20" />
               <p>Select a course to view distribution reports</p>
            </div>
          </div>
        );
      case 'Pending':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Needs Grading</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 overflow-y-auto pb-4">
               <div className="col-span-full py-20 text-center text-gray-500 italic bg-gray-50 rounded-3xl">
                 No pending submissions requiring grading
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('Pending')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Pending' ? 'text-white' : 'hover:text-white'}`}
          >
            <ClipboardList className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Pending</span>
          </button>
          <button 
            onClick={() => setActiveTab('Completed')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Completed' ? 'text-white' : 'hover:text-white'}`}
          >
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Completed</span>
          </button>
          <button 
            onClick={() => setActiveTab('Reports')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Reports' ? 'text-white' : 'hover:text-white'}`}
          >
            <BarChart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Reports</span>
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
