import React from 'react';
import { Clock, CalendarX, Activity, Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useAttendance } from '../../../hooks/useAttendance';

export default function Attendance() {
  const { data: attendance, isLoading } = useAttendance();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Timesheets</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <CalendarX className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Absences</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Activity className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overtime</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="mb-8 shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Attendance</h1>
            <p className="text-gray-500 text-sm md:text-base xl:text-lg">Track student attendance and daily status.</p>
          </div>

          <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendance?.map((record: any) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{record.student_name}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                          record.status === 'present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          record.status === 'absent' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {record.status === 'present' && <CheckCircle className="w-3 h-3" />}
                          {record.status === 'absent' && <XCircle className="w-3 h-3" />}
                          {record.status === 'late' && <AlertTriangle className="w-3 h-3" />}
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!attendance || attendance.length === 0) && (
                    <tr>
                      <td colSpan={3} className="py-10 text-center text-gray-500">No attendance records found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
