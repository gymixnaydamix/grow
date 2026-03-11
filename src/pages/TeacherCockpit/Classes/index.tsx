import React, { useState } from 'react';
import { MonitorPlay, Users, CalendarCheck, Search, Filter, MoreVertical, CheckCircle, XCircle, Clock, BookOpen, UserCheck, MapPin } from 'lucide-react';

export default function Classes() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Roster':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Class Roster</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">ID Number</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Email</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Alice Johnson', id: 'STU-2023-001', email: 'alice.j@university.edu', status: 'Active' },
                    { name: 'Bob Smith', id: 'STU-2023-042', email: 'bob.smith@university.edu', status: 'Active' },
                    { name: 'Charlie Davis', id: 'STU-2023-089', email: 'c.davis@university.edu', status: 'At Risk' },
                    { name: 'Diana Prince', id: 'STU-2023-105', email: 'diana.p@university.edu', status: 'Active' },
                    { name: 'Evan Wright', id: 'STU-2023-112', email: 'evan.w@university.edu', status: 'Inactive' },
                  ].map((student, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-medium text-gray-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{student.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{student.email}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                          student.status === 'At Risk' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Attendance':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Take Attendance</h2>
              <div className="flex items-center gap-3">
                <input type="date" className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="2023-10-24" />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Save Records
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-center">Present</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-center">Late</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-center">Absent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Alice Johnson', status: 'present' },
                    { name: 'Bob Smith', status: 'present' },
                    { name: 'Charlie Davis', status: 'late' },
                    { name: 'Diana Prince', status: 'absent' },
                    { name: 'Evan Wright', status: 'present' },
                  ].map((student, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{student.name}</td>
                      <td className="py-4 px-6 text-center">
                        <input type="radio" name={`attendance-${i}`} defaultChecked={student.status === 'present'} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <input type="radio" name={`attendance-${i}`} defaultChecked={student.status === 'late'} className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300" />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <input type="radio" name={`attendance-${i}`} defaultChecked={student.status === 'absent'} className="w-4 h-4 text-rose-600 focus:ring-rose-500 border-gray-300" />
                      </td>
                      <td className="py-4 px-6">
                        <input type="text" placeholder="Add note..." className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Overview':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">My Classes Overview</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                + New Class
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 shrink-0">
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Classes</p>
                    <h3 className="text-2xl font-bold text-gray-900">4</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900">128</h3>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Attendance</p>
                    <h3 className="text-2xl font-bold text-gray-900">94%</h3>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4 shrink-0">Current Semester</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0">
              {[
                { code: 'CS 301', name: 'Data Structures & Algorithms', students: 45, time: 'Mon/Wed 10:00 AM', room: 'Science Center 204' },
                { code: 'CS 405', name: 'Machine Learning', students: 32, time: 'Tue/Thu 02:00 PM', room: 'Tech Hub 101' },
                { code: 'ENG 101', name: 'Intro to Software Engineering', students: 51, time: 'Mon/Wed/Fri 09:00 AM', room: 'Main Hall A' },
              ].map((course, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg mb-2">
                        {course.code}
                      </span>
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.name}</h4>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      {course.students} Students
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {course.time}
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {course.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('Overview')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Overview' ? 'text-white' : 'hover:text-white'}`}
          >
            <MonitorPlay className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('Roster')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Roster' ? 'text-white' : 'hover:text-white'}`}
          >
            <Users className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Roster</span>
          </button>
          <button 
            onClick={() => setActiveTab('Attendance')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Attendance' ? 'text-white' : 'hover:text-white'}`}
          >
            <CalendarCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Attendance</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
