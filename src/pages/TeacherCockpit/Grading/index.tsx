import React, { useState } from 'react';
import { ClipboardList, CheckCircle, BarChart, Search, Filter, MoreVertical, FileText, Download, ChevronRight } from 'lucide-react';

export default function Grading() {
  const [activeTab, setActiveTab] = useState('Pending');

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
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Student</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Assignment</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Course</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Grade</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { student: 'Alice Johnson', assignment: 'Homework 3', course: 'CS 301', grade: '95/100' },
                    { student: 'Bob Smith', assignment: 'Homework 3', course: 'CS 301', grade: '88/100' },
                    { student: 'Charlie Davis', assignment: 'Essay Draft 1', course: 'ENG 101', grade: 'A-' },
                    { student: 'Diana Prince', assignment: 'Lab 2 Report', course: 'PHY 101', grade: '28/30' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{item.student}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{item.assignment}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{item.course}</td>
                      <td className="py-4 px-6 font-medium text-emerald-600">{item.grade}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Edit Grade</button>
                      </td>
                    </tr>
                  ))}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-4">
              {[
                { course: 'CS 301: Data Structures', avg: '88.5%', highest: '100%', lowest: '65%', distribution: [15, 20, 8, 2, 0] },
                { course: 'ENG 101: Tech Writing', avg: '92.1%', highest: '98%', lowest: '78%', distribution: [25, 18, 5, 0, 0] },
                { course: 'PHY 101: Physics I', avg: '81.4%', highest: '99%', lowest: '55%', distribution: [8, 15, 12, 6, 2] },
              ].map((report, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">{report.course}</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Average</p>
                      <p className="text-lg font-bold text-indigo-600">{report.avg}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Highest</p>
                      <p className="text-lg font-bold text-emerald-600">{report.highest}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-500 mb-1">Lowest</p>
                      <p className="text-lg font-bold text-rose-600">{report.lowest}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Grade Distribution (A, B, C, D, F)</p>
                    <div className="flex items-end gap-2 h-24">
                      {report.distribution.map((count, j) => {
                        const max = Math.max(...report.distribution);
                        const height = max > 0 ? (count / max) * 100 : 0;
                        return (
                          <div key={j} className="flex-1 flex flex-col justify-end items-center gap-1">
                            <div 
                              className="w-full bg-indigo-200 rounded-t-md hover:bg-indigo-400 transition-colors" 
                              style={{ height: `${height}%` }}
                              title={`${count} students`}
                            ></div>
                            <span className="text-[10px] font-medium text-gray-500">
                              {['A', 'B', 'C', 'D', 'F'][j]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
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
              {[
                { title: 'Homework 4: Binary Trees', course: 'CS 301', pendingCount: 38, dueDate: 'Yesterday' },
                { title: 'Essay Draft 1', course: 'ENG 101', pendingCount: 12, dueDate: '2 days ago' },
                { title: 'Lab 3 Report', course: 'PHY 101', pendingCount: 5, dueDate: 'Last week' },
              ].map((assignment, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{assignment.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <span className="font-medium text-indigo-600">{assignment.course}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">Due {assignment.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 sm:pl-4 sm:border-l border-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">{assignment.pendingCount}</p>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submissions</p>
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
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

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
