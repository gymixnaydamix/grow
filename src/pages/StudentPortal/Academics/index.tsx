import React, { useState } from 'react';
import { BookOpen, GraduationCap, Library, TrendingUp, Award, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { useCourses } from '../../../hooks/useCourses';
import { useGrades } from '../../../hooks/useGrades';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: grades, isLoading: gradesLoading } = useGrades();

  const renderContent = () => {
    switch (activeTab) {
      case 'Programs':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Academic Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
              {coursesLoading ? (
                <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : courses?.length === 0 ? (
                <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-3xl">No courses assigned to your program.</div>
              ) : (
                courses?.map((course: any, i: number) => (
                  <div key={course.id} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 uppercase tracking-wider">
                        {course.department || 'Active'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{course.code}</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-500">Credits</span>
                        <span className="font-medium text-gray-900">{course.credits} Units</span>
                      </div>
                    </div>
                    <button className="mt-5 w-full py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors">
                      View Syllabus
                    </button>
                  </div>
                ))
              )}
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
              ].map((resource, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer flex flex-col">
                  <div className={`w-10 h-10 rounded-xl ${resource.bg} ${resource.color} flex items-center justify-center mb-4`}>
                    <resource.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{resource.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Overview':
      default:
        const avgGrade = grades?.length > 0
          ? (grades.reduce((acc: number, g: any) => acc + (parseFloat(g.grade) || 0), 0) / grades.length).toFixed(1)
          : 'N/A';

        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Academic Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-indigo-100">Overall Grade Avg</span>
                </div>
                <div className="text-3xl font-bold">{avgGrade}</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-600">Credits Earned</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {courses?.reduce((acc: number, c: any) => acc + (c.credits || 0), 0) || 0}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Academic Records</h3>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-100">
                {gradesLoading ? (
                   <div className="p-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div>
                ) : grades?.length === 0 ? (
                   <div className="p-10 text-center text-gray-500 italic">No academic records found</div>
                ) : (
                  grades?.map((grade: any) => (
                    <div key={grade.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Grade Posted: {grade.grade}</div>
                          <div className="text-sm text-gray-500">Course ID: {grade.course_id.slice(0, 8)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">{new Date(grade.created_at).toLocaleDateString()}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                      </div>
                    </div>
                  ))
                )}
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
          <button onClick={() => setActiveTab('Overview')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Overview' ? 'text-white' : 'hover:text-white'}`}><GraduationCap className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span></button>
          <button onClick={() => setActiveTab('Programs')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Programs' ? 'text-white' : 'hover:text-white'}`}><BookOpen className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Programs</span></button>
          <button onClick={() => setActiveTab('Resources')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Resources' ? 'text-white' : 'hover:text-white'}`}><Library className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Resources</span></button>
        </div>
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
}
