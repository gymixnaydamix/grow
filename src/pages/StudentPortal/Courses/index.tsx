import React, { useState } from 'react';
import { Book, FileText, Video, Search, Filter, PlayCircle, Download, ExternalLink, Clock, CheckCircle, ArrowRight } from 'lucide-react';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('My Classes');

  const renderContent = () => {
    switch (activeTab) {
      case 'Materials':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Course Materials</h2>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search materials by name or course..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Course</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Type</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Added</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Chapter 4: Advanced Algorithms', course: 'CS 301', type: 'PDF', size: '2.4 MB', date: 'Oct 24, 2023' },
                    { name: 'Project 2 Guidelines', course: 'ENG 205', type: 'Document', size: '1.1 MB', date: 'Oct 22, 2023' },
                    { name: 'Midterm Review Slides', course: 'MATH 201', type: 'Presentation', size: '5.6 MB', date: 'Oct 20, 2023' },
                    { name: 'Dataset for Assignment 3', course: 'CS 301', type: 'CSV', size: '12.8 MB', date: 'Oct 18, 2023' },
                    { name: 'Syllabus (Updated)', course: 'PHY 101', type: 'PDF', size: '0.8 MB', date: 'Sep 05, 2023' },
                  ].map((material, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{material.name}</div>
                            <div className="text-xs text-gray-500">{material.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">{material.course}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{material.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{material.date}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Lectures':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Recorded Lectures</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { title: 'Lecture 12: Dynamic Programming', course: 'CS 301', duration: '1h 15m', date: 'Oct 25, 2023', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=200' },
                { title: 'Lecture 11: Graph Algorithms', course: 'CS 301', duration: '1h 20m', date: 'Oct 23, 2023', progress: 45, thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=200' },
                { title: 'Week 8: Technical Proposals', course: 'ENG 205', duration: '55m', date: 'Oct 24, 2023', progress: 0, thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80&w=400&h=200' },
                { title: 'Lecture 15: Quantum Mechanics', course: 'PHY 101', duration: '1h 10m', date: 'Oct 22, 2023', progress: 100, thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400&h=200' },
              ].map((lecture, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer overflow-hidden flex flex-col">
                  <div className="h-32 w-full bg-gray-200 relative group-hover:opacity-90 transition-opacity">
                    <img src={lecture.thumbnail} alt={lecture.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                      {lecture.duration}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs font-medium text-indigo-600 mb-1">{lecture.course}</div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{lecture.title}</h3>
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span>{lecture.date}</span>
                        <span>{lecture.progress > 0 ? `${lecture.progress}% watched` : 'Not started'}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${lecture.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} style={{ width: `${lecture.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'My Classes':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Current Classes</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { 
                  code: 'CS 301', 
                  name: 'Data Structures & Algorithms', 
                  prof: 'Dr. Alan Turing', 
                  time: 'Mon, Wed 10:00 AM - 11:15 AM', 
                  location: 'Science Center 204',
                  nextAssignment: 'Project 2 (Due in 3 days)',
                  grade: 'A-'
                },
                { 
                  code: 'ENG 205', 
                  name: 'Technical Writing', 
                  prof: 'Prof. Sarah Jenkins', 
                  time: 'Tue, Thu 1:00 PM - 2:15 PM', 
                  location: 'Main Academic 102',
                  nextAssignment: 'Draft Proposal (Due Tomorrow)',
                  grade: 'B+'
                },
                { 
                  code: 'MATH 201', 
                  name: 'Linear Algebra', 
                  prof: 'Dr. Emily Chen', 
                  time: 'Mon, Wed, Fri 9:00 AM - 9:50 AM', 
                  location: 'Science Center 105',
                  nextAssignment: 'Problem Set 5 (Due in 5 days)',
                  grade: 'A'
                },
                { 
                  code: 'PHY 101', 
                  name: 'Introduction to Physics', 
                  prof: 'Dr. Robert Oppenheimer', 
                  time: 'Tue, Thu 9:30 AM - 10:45 AM', 
                  location: 'Science Center 301',
                  nextAssignment: 'Lab Report 4 (Due Next Week)',
                  grade: 'B'
                },
              ].map((course, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all bg-white group flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg mb-2">
                        {course.code}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center shrink-0 border border-emerald-100">
                      {course.grade}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 flex justify-center"><CheckCircle className="w-4 h-4 text-gray-400" /></div>
                      {course.prof}
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 flex justify-center"><Clock className="w-4 h-4 text-gray-400" /></div>
                      {course.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 flex justify-center"><ExternalLink className="w-4 h-4 text-gray-400" /></div>
                      {course.location}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Next up:</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-600">{course.nextAssignment}</span>
                      <button className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
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
            onClick={() => setActiveTab('My Classes')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'My Classes' ? 'text-white' : 'hover:text-white'}`}
          >
            <Book className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">My Classes</span>
          </button>
          <button 
            onClick={() => setActiveTab('Materials')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Materials' ? 'text-white' : 'hover:text-white'}`}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Materials</span>
          </button>
          <button 
            onClick={() => setActiveTab('Lectures')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Lectures' ? 'text-white' : 'hover:text-white'}`}
          >
            <Video className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Lectures</span>
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
