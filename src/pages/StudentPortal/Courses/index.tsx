import React, { useState } from 'react';
import { Book, FileText, Video, Search, Filter, Download, ExternalLink, Clock, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useCourses } from '../../../hooks/useCourses';
import { useGrades } from '../../../hooks/useGrades';

export default function Courses() {
  const [activeTab, setActiveTab] = useState('My Classes');
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: grades } = useGrades();

  const renderContent = () => {
    switch (activeTab) {
      case 'Materials':
        return (
          <div className="flex-1 flex flex-col min-h-0">
             <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed">Module for course materials is under development.</div>
          </div>
        );
      case 'Lectures':
        return (
          <div className="flex-1 flex flex-col min-h-0">
             <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed">Video lecture portal is planned for V2.</div>
          </div>
        );
      case 'My Classes':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Current Classes</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {coursesLoading ? (
                 <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : courses?.length === 0 ? (
                 <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-3xl">No courses assigned to your program.</div>
              ) : (
                courses?.map((course: any, i: number) => {
                  const courseGrade = grades?.find((g: any) => g.course_id === course.id)?.grade || 'N/A';
                  return (
                    <div key={course.id} className="border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all bg-white group flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg mb-2">
                            {course.code}
                          </span>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.name}</h3>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center shrink-0 border border-emerald-100">
                          {courseGrade}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-4 flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-5 flex justify-center"><CheckCircle className="w-4 h-4 text-gray-400" /></div>
                          Department: {course.department || 'Academic'}
                        </div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-5 flex justify-center"><Clock className="w-4 h-4 text-gray-400" /></div>
                          Credits: {course.credits}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 flex justify-center"><ExternalLink className="w-4 h-4 text-gray-400" /></div>
                          Course ID: {course.id.slice(0, 8)}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-indigo-600">View Details</span>
                          <button className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button onClick={() => setActiveTab('My Classes')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'My Classes' ? 'text-white' : 'hover:text-white'}`}><Book className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">My Classes</span></button>
          <button onClick={() => setActiveTab('Materials')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Materials' ? 'text-white' : 'hover:text-white'}`}><FileText className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Materials</span></button>
          <button onClick={() => setActiveTab('Lectures')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Lectures' ? 'text-white' : 'hover:text-white'}`}><Video className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Lectures</span></button>
        </div>
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
}
