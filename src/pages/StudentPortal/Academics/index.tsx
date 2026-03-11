import React, { useState } from 'react';
import { BookOpen, GraduationCap, Library, TrendingUp, Award, Clock, ChevronRight, Download, ExternalLink } from 'lucide-react';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('Overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'Programs':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Academic Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Computer Science B.S.', status: 'Major', progress: 75, credits: '90/120' },
                { name: 'Data Science', status: 'Minor', progress: 40, credits: '12/30' },
                { name: 'Honors Program', status: 'Special', progress: 60, credits: '15/25' }
              ].map((program, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {program.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{program.name}</h3>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">{program.credits} Credits</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#4F46E5] h-2 rounded-full" style={{ width: `${program.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="mt-5 w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors">
                    View Requirements
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Resources':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Academic Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { title: 'University Library', desc: 'Access academic journals, books, and research databases.', icon: Library, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Writing Center', desc: 'Schedule appointments for essay review and writing help.', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Tutoring Services', desc: 'Find peer tutors for specific courses and subjects.', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                { title: 'Academic Advising', desc: 'Book a session with your academic advisor.', icon: UserCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'Career Center', desc: 'Resume reviews, mock interviews, and job boards.', icon: Briefcase, color: 'text-rose-600', bg: 'bg-rose-50' },
                { title: 'Student Handbook', desc: 'Official academic policies and procedures.', icon: Book, color: 'text-gray-600', bg: 'bg-gray-100' },
              ].map((resource, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer flex flex-col">
                  <div className={`w-10 h-10 rounded-xl ${resource.bg} ${resource.color} flex items-center justify-center mb-4`}>
                    <resource.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{resource.desc}</p>
                  <div className="flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                    Access Resource <ExternalLink className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Overview':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Academic Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-indigo-100">Cumulative GPA</span>
                </div>
                <div className="text-3xl font-bold">3.84</div>
                <div className="text-sm text-indigo-100 mt-1">+0.12 from last semester</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-600">Credits Earned</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">90<span className="text-lg text-gray-400 font-medium">/120</span></div>
                <div className="text-sm text-gray-500 mt-1">Senior Standing</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="font-medium text-gray-600">Academic Standing</span>
                </div>
                <div className="text-xl font-bold text-gray-900 mt-2">Good Standing</div>
                <div className="text-sm text-gray-500 mt-2">Dean's List (Fall 2023)</div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Academic Activity</h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {[
                  { title: 'Midterm Grade Posted', course: 'CS 301: Data Structures', date: 'Oct 24, 2023', type: 'grade' },
                  { title: 'Assignment Graded: Project 2', course: 'ENG 205: Technical Writing', date: 'Oct 22, 2023', type: 'assignment' },
                  { title: 'Registration Open for Spring 2024', course: 'Registrar Office', date: 'Oct 20, 2023', type: 'system' },
                  { title: 'Academic Advising Hold Removed', course: 'Advising Center', date: 'Oct 15, 2023', type: 'system' },
                ].map((activity, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'grade' ? 'bg-emerald-50 text-emerald-600' :
                        activity.type === 'assignment' ? 'bg-blue-50 text-blue-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {activity.type === 'grade' ? <Award className="w-5 h-5" /> :
                         activity.type === 'assignment' ? <BookOpen className="w-5 h-5" /> :
                         <Bell className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{activity.title}</div>
                        <div className="text-sm text-gray-500">{activity.course}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400">{activity.date}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  // Import missing icons locally for this component
  const FileText = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
  const Users = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
  const UserCheck = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>;
  const Briefcase = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
  const Book = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>;
  const Bell = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('Overview')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Overview' ? 'text-white' : 'hover:text-white'}`}
          >
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('Programs')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Programs' ? 'text-white' : 'hover:text-white'}`}
          >
            <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Programs</span>
          </button>
          <button 
            onClick={() => setActiveTab('Resources')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Resources' ? 'text-white' : 'hover:text-white'}`}
          >
            <Library className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Resources</span>
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
