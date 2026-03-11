import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, FileText, AlertCircle, Map } from 'lucide-react';

export default function Schedule() {
  const [activeTab, setActiveTab] = useState('Weekly');

  const renderContent = () => {
    switch (activeTab) {
      case 'Exams':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Exam Timetable</h2>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3 shrink-0">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-blue-800">Final Exams Approaching</h3>
                <p className="text-sm text-blue-700 mt-1">Please arrive at least 15 minutes before your scheduled exam time. Bring your student ID and required materials.</p>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date & Time</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Course</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Location</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { date: 'Dec 12, 2023', time: '09:00 AM - 12:00 PM', course: 'CS 301: Data Structures', location: 'Main Hall A', type: 'Final Exam' },
                    { date: 'Dec 14, 2023', time: '01:00 PM - 03:00 PM', course: 'ENG 205: Technical Writing', location: 'Room 402', type: 'Final Presentation' },
                    { date: 'Dec 15, 2023', time: '10:00 AM - 12:00 PM', course: 'MATH 201: Linear Algebra', location: 'Gymnasium', type: 'Final Exam' },
                    { date: 'Dec 18, 2023', time: '02:00 PM - 05:00 PM', course: 'PHY 101: Intro to Physics', location: 'Science Lab 1', type: 'Lab Practical' },
                  ].map((exam, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{exam.date}</div>
                        <div className="text-sm text-gray-500">{exam.time}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">{exam.course}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {exam.location}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          exam.type.includes('Exam') ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                          {exam.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Locations':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Campus Locations</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto pb-4">
              <div className="lg:col-span-2 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative min-h-[400px]">
                {/* Placeholder for an interactive map */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <Map className="w-16 h-16 mb-4 opacity-50" />
                  <p className="font-medium">Interactive Campus Map</p>
                  <p className="text-sm">Select a location from the list to view it on the map.</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-900">Your Class Locations</h3>
                {[
                  { name: 'Science Center 204', course: 'CS 301', building: 'Science Center', floor: '2nd Floor' },
                  { name: 'Main Academic 102', course: 'ENG 205', building: 'Main Academic Building', floor: '1st Floor' },
                  { name: 'Science Center 105', course: 'MATH 201', building: 'Science Center', floor: '1st Floor' },
                  { name: 'Science Center 301', course: 'PHY 101', building: 'Science Center', floor: '3rd Floor' },
                ].map((loc, i) => (
                  <div key={i} className="p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all bg-white cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{loc.name}</h4>
                        <p className="text-xs text-indigo-600 font-medium mb-1">{loc.course}</p>
                        <p className="text-xs text-gray-500">{loc.building} • {loc.floor}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Weekly':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Weekly Schedule</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1">
                  <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-gray-900 px-2">Oct 23 - Oct 29, 2023</span>
                  <button className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Simple Calendar View */}
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl bg-white flex flex-col">
              <div className="grid grid-cols-6 border-b border-gray-100 shrink-0">
                <div className="p-4 text-center border-r border-gray-100 bg-gray-50/50">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Time</div>
                </div>
                {['Mon 23', 'Tue 24', 'Wed 25', 'Thu 26', 'Fri 27'].map((day, i) => (
                  <div key={i} className={`p-4 text-center border-r border-gray-100 ${i === 1 ? 'bg-indigo-50/30' : ''}`}>
                    <div className={`text-sm font-bold ${i === 1 ? 'text-indigo-600' : 'text-gray-900'}`}>{day}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 overflow-y-auto relative">
                {/* Time slots */}
                {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'].map((time, i) => (
                  <div key={i} className="grid grid-cols-6 border-b border-gray-50 min-h-[80px]">
                    <div className="p-2 text-right border-r border-gray-100 bg-gray-50/50">
                      <span className="text-xs font-medium text-gray-500">{time}</span>
                    </div>
                    <div className="border-r border-gray-100 relative"></div>
                    <div className="border-r border-gray-100 relative bg-indigo-50/10"></div>
                    <div className="border-r border-gray-100 relative"></div>
                    <div className="border-r border-gray-100 relative"></div>
                    <div className="border-r border-gray-100 relative"></div>
                  </div>
                ))}
                
                {/* Classes (Absolute positioned over the grid for demo purposes) */}
                <div className="absolute top-[80px] left-[16.66%] w-[16.66%] p-1 h-[70px]">
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-blue-800">MATH 201</div>
                    <div className="text-[10px] text-blue-600">09:00 - 09:50</div>
                  </div>
                </div>
                <div className="absolute top-[80px] left-[50%] w-[16.66%] p-1 h-[70px]">
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-blue-800">MATH 201</div>
                    <div className="text-[10px] text-blue-600">09:00 - 09:50</div>
                  </div>
                </div>
                <div className="absolute top-[80px] left-[83.33%] w-[16.66%] p-1 h-[70px]">
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-blue-800">MATH 201</div>
                    <div className="text-[10px] text-blue-600">09:00 - 09:50</div>
                  </div>
                </div>

                <div className="absolute top-[160px] left-[16.66%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-indigo-800">CS 301</div>
                    <div className="text-[10px] text-indigo-600">10:00 - 11:15</div>
                  </div>
                </div>
                <div className="absolute top-[160px] left-[50%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-indigo-100 border border-indigo-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-indigo-800">CS 301</div>
                    <div className="text-[10px] text-indigo-600">10:00 - 11:15</div>
                  </div>
                </div>

                <div className="absolute top-[120px] left-[33.33%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-emerald-800">PHY 101</div>
                    <div className="text-[10px] text-emerald-600">09:30 - 10:45</div>
                  </div>
                </div>
                <div className="absolute top-[120px] left-[66.66%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-emerald-800">PHY 101</div>
                    <div className="text-[10px] text-emerald-600">09:30 - 10:45</div>
                  </div>
                </div>

                <div className="absolute top-[400px] left-[33.33%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-amber-100 border border-amber-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-amber-800">ENG 205</div>
                    <div className="text-[10px] text-amber-600">01:00 - 02:15</div>
                  </div>
                </div>
                <div className="absolute top-[400px] left-[66.66%] w-[16.66%] p-1 h-[100px]">
                  <div className="bg-amber-100 border border-amber-200 rounded-lg p-2 h-full overflow-hidden">
                    <div className="text-xs font-bold text-amber-800">ENG 205</div>
                    <div className="text-[10px] text-amber-600">01:00 - 02:15</div>
                  </div>
                </div>
                
                {/* Current Time Indicator */}
                <div className="absolute top-[280px] left-0 right-0 border-t-2 border-red-500 z-10 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"></div>
                </div>
              </div>
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
            onClick={() => setActiveTab('Weekly')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Weekly' ? 'text-white' : 'hover:text-white'}`}
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Weekly</span>
          </button>
          <button 
            onClick={() => setActiveTab('Exams')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Exams' ? 'text-white' : 'hover:text-white'}`}
          >
            <Clock className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Exams</span>
          </button>
          <button 
            onClick={() => setActiveTab('Locations')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Locations' ? 'text-white' : 'hover:text-white'}`}
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Locations</span>
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
