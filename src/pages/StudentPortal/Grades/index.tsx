import React, { useState } from 'react';
import { Award, TrendingUp, FileCheck, Download, ExternalLink, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function Grades() {
  const [activeTab, setActiveTab] = useState('Current');

  const renderContent = () => {
    switch (activeTab) {
      case 'Transcripts':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Official Transcripts</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Request Official Transcript
              </button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Unofficial Transcript</h3>
                  <p className="text-sm text-gray-500">Last updated: Oct 26, 2023</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100 mb-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Cumulative GPA</div>
                  <div className="text-xl font-bold text-gray-900">3.84</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Credits</div>
                  <div className="text-xl font-bold text-gray-900">90</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Major GPA</div>
                  <div className="text-xl font-bold text-gray-900">3.92</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Academic Standing</div>
                  <div className="text-xl font-bold text-emerald-600">Good</div>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-4 shrink-0">Academic History</h3>
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Term</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Credits Earned</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Term GPA</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Standing</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { term: 'Spring 2023', credits: '15', gpa: '3.90', standing: "Dean's List" },
                    { term: 'Fall 2022', credits: '15', gpa: '3.85', standing: "Dean's List" },
                    { term: 'Spring 2022', credits: '16', gpa: '3.75', standing: 'Good' },
                    { term: 'Fall 2021', credits: '14', gpa: '3.80', standing: "Dean's List" },
                    { term: 'Spring 2021', credits: '15', gpa: '3.95', standing: "Dean's List" },
                    { term: 'Fall 2020', credits: '15', gpa: '3.70', standing: 'Good' },
                  ].map((history, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{history.term}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{history.credits}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{history.gpa}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          history.standing.includes('Dean') ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>
                          {history.standing}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Evaluations':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Course & Instructor Evaluations</h2>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3 shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-amber-800">Pending Evaluations</h3>
                <p className="text-sm text-amber-700 mt-1">You have 2 course evaluations due by December 15th. Completing these is required to view your final grades early.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
              {[
                { course: 'CS 301: Data Structures', prof: 'Dr. Alan Turing', status: 'Pending', due: 'Dec 15, 2023' },
                { course: 'ENG 205: Technical Writing', prof: 'Prof. Sarah Jenkins', status: 'Pending', due: 'Dec 15, 2023' },
                { course: 'MATH 201: Linear Algebra', prof: 'Dr. Emily Chen', status: 'Completed', due: 'May 15, 2023' },
                { course: 'PHY 101: Intro to Physics', prof: 'Dr. Robert Oppenheimer', status: 'Completed', due: 'May 15, 2023' },
              ].map((evalItem, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      evalItem.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {evalItem.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{evalItem.course}</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-1">Instructor: {evalItem.prof}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Due: {evalItem.due}</span>
                    {evalItem.status === 'Pending' ? (
                      <button className="text-sm font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                        Start Evaluation
                      </button>
                    ) : (
                      <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Submitted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Current':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6 shrink-0">Current Semester Grades</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {[
                { 
                  code: 'CS 301', 
                  name: 'Data Structures & Algorithms', 
                  credits: 4,
                  grade: 'A-',
                  score: '91.5%',
                  status: 'On Track',
                  assignments: [
                    { name: 'Midterm Exam', score: '92/100', weight: '30%' },
                    { name: 'Project 1', score: '95/100', weight: '20%' },
                    { name: 'Homework 1-4', score: '88/100', weight: '20%' }
                  ]
                },
                { 
                  code: 'ENG 205', 
                  name: 'Technical Writing', 
                  credits: 3,
                  grade: 'B+',
                  score: '88.2%',
                  status: 'On Track',
                  assignments: [
                    { name: 'Proposal Draft', score: '85/100', weight: '20%' },
                    { name: 'Research Paper', score: '90/100', weight: '40%' },
                    { name: 'Participation', score: '95/100', weight: '10%' }
                  ]
                },
                { 
                  code: 'MATH 201', 
                  name: 'Linear Algebra', 
                  credits: 4,
                  grade: 'A',
                  score: '96.0%',
                  status: 'Excellent',
                  assignments: [
                    { name: 'Midterm 1', score: '98/100', weight: '25%' },
                    { name: 'Midterm 2', score: '94/100', weight: '25%' },
                    { name: 'Problem Sets', score: '97/100', weight: '20%' }
                  ]
                },
                { 
                  code: 'PHY 101', 
                  name: 'Introduction to Physics', 
                  credits: 4,
                  grade: 'B',
                  score: '84.5%',
                  status: 'Needs Attention',
                  assignments: [
                    { name: 'Midterm Exam', score: '78/100', weight: '30%' },
                    { name: 'Lab Reports', score: '92/100', weight: '25%' },
                    { name: 'Homework', score: '85/100', weight: '15%' }
                  ]
                },
              ].map((course, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all bg-white group flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg mb-2">
                        {course.code} • {course.credits} Credits
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.name}</h3>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`w-12 h-12 rounded-full font-bold text-xl flex items-center justify-center shrink-0 border ${
                        course.grade.startsWith('A') ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        course.grade.startsWith('B') ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {course.grade}
                      </div>
                      <span className="text-xs font-medium text-gray-500 mt-1">{course.score}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 flex-1">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Recent Scores</h4>
                    <div className="space-y-2">
                      {course.assignments.map((assn, j) => (
                        <div key={j} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">{assn.name} <span className="text-gray-400 text-xs">({assn.weight})</span></span>
                          <span className="font-medium text-gray-900">{assn.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      course.status === 'Excellent' ? 'text-emerald-700 bg-emerald-50' :
                      course.status === 'On Track' ? 'text-blue-700 bg-blue-50' :
                      'text-amber-700 bg-amber-50'
                    }`}>
                      {course.status}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
                      Full Details <ExternalLink className="w-4 h-4" />
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
            onClick={() => setActiveTab('Current')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Current' ? 'text-white' : 'hover:text-white'}`}
          >
            <Award className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Current</span>
          </button>
          <button 
            onClick={() => setActiveTab('Transcripts')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Transcripts' ? 'text-white' : 'hover:text-white'}`}
          >
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Transcripts</span>
          </button>
          <button 
            onClick={() => setActiveTab('Evaluations')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Evaluations' ? 'text-white' : 'hover:text-white'}`}
          >
            <FileCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Evaluations</span>
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
