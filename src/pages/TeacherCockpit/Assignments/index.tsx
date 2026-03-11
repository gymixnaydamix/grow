import React, { useState } from 'react';
import { Book, Edit3, Archive, Plus, Search, Filter, MoreVertical, FileText, Clock, CheckCircle } from 'lucide-react';

export default function Assignments() {
  const [activeTab, setActiveTab] = useState('Active');

  const renderContent = () => {
    switch (activeTab) {
      case 'Drafts':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Draft Assignments</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Draft
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { title: 'Midterm Project Guidelines', course: 'CS 301', lastEdited: '2 hours ago' },
                { title: 'Reading Response Week 5', course: 'ENG 101', lastEdited: 'Yesterday' },
                { title: 'Lab Report Template', course: 'PHY 101', lastEdited: '3 days ago' },
              ].map((draft, i) => (
                <div key={i} className="bg-white border border-dashed border-gray-300 rounded-2xl p-5 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Edit3 className="w-5 h-5" />
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{draft.title}</h4>
                  <p className="text-sm text-indigo-600 font-medium mb-3">{draft.course}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    Last edited {draft.lastEdited}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Archived':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Archived Assignments</h2>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search archives..." 
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Title</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Course</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Term</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { title: 'Final Essay Submission', course: 'ENG 101', term: 'Spring 2023' },
                    { title: 'Algorithm Analysis Project', course: 'CS 301', term: 'Spring 2023' },
                    { title: 'Physics Lab 4', course: 'PHY 101', term: 'Fall 2022' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <Archive className="w-4 h-4 text-gray-400" />
                          {item.title}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">{item.course}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{item.term}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">Restore</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Active':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Active Assignments</h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Create Assignment
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 overflow-y-auto pb-4">
              {[
                { title: 'Homework 4: Binary Trees', course: 'CS 301', due: 'Tomorrow, 11:59 PM', submitted: 38, total: 45, status: 'urgent' },
                { title: 'Essay Draft 1', course: 'ENG 101', due: 'Oct 28, 11:59 PM', submitted: 12, total: 51, status: 'normal' },
                { title: 'Lab 3 Report', course: 'PHY 101', due: 'Oct 30, 05:00 PM', submitted: 5, total: 30, status: 'normal' },
                { title: 'Quiz 2: Sorting', course: 'CS 301', due: 'Nov 02, In Class', submitted: 0, total: 45, status: 'upcoming' },
              ].map((assignment, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        assignment.status === 'urgent' ? 'bg-rose-50 text-rose-600' :
                        assignment.status === 'upcoming' ? 'bg-blue-50 text-blue-600' :
                        'bg-indigo-50 text-indigo-600'
                      }`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{assignment.title}</h4>
                        <p className="text-xs font-medium text-indigo-600">{assignment.course}</p>
                      </div>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className={`w-4 h-4 ${assignment.status === 'urgent' ? 'text-rose-500' : 'text-gray-400'}`} />
                      <span className={assignment.status === 'urgent' ? 'text-rose-600 font-medium' : 'text-gray-600'}>
                        Due: {assignment.due}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{assignment.submitted}</span>
                        <span className="text-xs text-gray-500"> / {assignment.total}</span>
                      </div>
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${assignment.submitted === assignment.total ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                          style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                        ></div>
                      </div>
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
            onClick={() => setActiveTab('Active')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Active' ? 'text-white' : 'hover:text-white'}`}
          >
            <Book className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Active</span>
          </button>
          <button 
            onClick={() => setActiveTab('Drafts')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Drafts' ? 'text-white' : 'hover:text-white'}`}
          >
            <Edit3 className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Drafts</span>
          </button>
          <button 
            onClick={() => setActiveTab('Archived')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Archived' ? 'text-white' : 'hover:text-white'}`}
          >
            <Archive className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Archived</span>
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
