import React from 'react';
import { UserCheck, Search, Filter, MoreVertical, FileText, Loader2 } from 'lucide-react';
import { useStudents } from '../../../hooks/useStudents';

interface EnrollmentProps {
  activeSubPage?: string;
}

export default function Enrollment({ activeSubPage = 'Enrollment' }: EnrollmentProps) {
  const { data: students, isLoading } = useStudents();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <UserCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Enrolled</span>
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{activeSubPage}</h1>
              <p className="text-gray-500 text-sm md:text-base">Active student records and enrollment status.</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : students?.length === 0 ? (
               <div className="py-20 text-center text-gray-400 italic">No enrolled students found.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Grade</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students?.map((student: any) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{student.name}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{student.grade}</td>
                      <td className="py-4 px-6 text-sm text-gray-500 font-mono uppercase">{student.id.slice(0, 8)}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
