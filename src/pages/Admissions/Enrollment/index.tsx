import React from 'react';
import { UserCheck, Clock, UserMinus, Search, Filter, MoreVertical, FileText, CheckCircle, XCircle } from 'lucide-react';

interface EnrollmentProps {
  activeSubPage?: string;
}

export default function Enrollment({ activeSubPage = 'Enrollment' }: EnrollmentProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <UserCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Registered</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Waitlisted</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <UserMinus className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Withdrawn</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{activeSubPage}</h1>
              <p className="text-gray-500 text-sm md:text-base xl:text-lg">Manage student {activeSubPage.toLowerCase()} status.</p>
            </div>
            <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Export Roster
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search enrolled students by name, ID, or grade..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Data Table */}
          <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Grade</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Enrollment Date</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'Sophia Martinez', id: 'STU-2024-001', grade: 'Grade 9', date: 'Aug 15, 2023', status: 'Registered' },
                  { name: 'Jackson Lee', id: 'STU-2024-002', grade: 'Grade 10', date: 'Aug 16, 2023', status: 'Registered' },
                  { name: 'Olivia White', id: 'STU-2024-003', grade: 'Grade 7', date: 'Aug 20, 2023', status: 'Waitlisted' },
                  { name: 'Lucas Harris', id: 'STU-2024-004', grade: 'Grade 11', date: 'Aug 22, 2023', status: 'Registered' },
                  { name: 'Emma Clark', id: 'STU-2024-005', grade: 'Grade 8', date: 'Sep 01, 2023', status: 'Withdrawn' },
                ].map((student, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500">{student.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {student.grade}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {student.date}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        student.status === 'Registered' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : student.status === 'Withdrawn'
                          ? 'bg-red-50 text-red-700 border-red-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          student.status === 'Registered' ? 'bg-emerald-500' : 
                          student.status === 'Withdrawn' ? 'bg-red-500' : 'bg-amber-500'
                        }`}></span>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Record">
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
