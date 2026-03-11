import React, { useState } from 'react';
import { Building, Map, Key, Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface FacilitiesProps {
  activeSubPage: string;
}

export default function Facilities({ activeSubPage }: FacilitiesProps) {
  const [activeTab, setActiveTab] = useState('Buildings');

  const renderContent = () => {
    switch (activeTab) {
      case 'Spaces':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Spaces & Rooms</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Space
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Science Lab 101', type: 'Laboratory', building: 'North Wing', capacity: 30, status: 'Available' },
                { name: 'Auditorium A', type: 'Event Space', building: 'Main Campus', capacity: 500, status: 'In Use' },
                { name: 'Library Study Room 4', type: 'Study Room', building: 'Library', capacity: 6, status: 'Maintenance' },
                { name: 'Gymnasium', type: 'Athletic Facility', building: 'Sports Complex', capacity: 1000, status: 'Available' },
                { name: 'Classroom 204', type: 'Classroom', building: 'South Wing', capacity: 25, status: 'Available' },
              ].map((space, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Map className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      space.status === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      space.status === 'In Use' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {space.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{space.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{space.type} • {space.building}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-700">Capacity: {space.capacity}</span>
                    <button className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Access':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Access Control</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Key className="w-4 h-4" />
                Grant Access
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">User/Group</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Location</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Access Level</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Schedule</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { user: 'Science Teachers', location: 'Science Labs', level: '24/7 Access', schedule: 'Always' },
                    { user: 'Students (Grade 12)', location: 'Library Study Rooms', level: 'Restricted', schedule: 'Mon-Fri, 8AM-5PM' },
                    { user: 'Maintenance Staff', location: 'All Buildings', level: 'Master Key', schedule: 'Always' },
                    { user: 'John Doe', location: 'Server Room', level: 'High Security', schedule: 'Mon-Fri, 9AM-6PM' },
                  ].map((access, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{access.user}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{access.location}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {access.level}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{access.schedule}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revoke">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Buildings':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Campus Buildings</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Building
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search buildings..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Main Academic Building', code: 'MAB', floors: 4, status: 'Operational', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400&h=200' },
                { name: 'Science Center', code: 'SCI', floors: 3, status: 'Operational', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400&h=200' },
                { name: 'Student Union', code: 'STU', floors: 2, status: 'Maintenance', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=200' },
                { name: 'Library', code: 'LIB', floors: 5, status: 'Operational', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=200' },
              ].map((building, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer overflow-hidden flex flex-col">
                  <div className="h-32 w-full bg-gray-200 relative">
                    <img src={building.image} alt={building.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border shadow-sm ${
                        building.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {building.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{building.name}</h3>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Code: {building.code} • {building.floors} Floors</p>
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">View Floorplan</span>
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
            onClick={() => setActiveTab('Buildings')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Buildings' ? 'text-white' : 'hover:text-white'}`}
          >
            <Building className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Buildings</span>
          </button>
          <button 
            onClick={() => setActiveTab('Spaces')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Spaces' ? 'text-white' : 'hover:text-white'}`}
          >
            <Map className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Spaces</span>
          </button>
          <button 
            onClick={() => setActiveTab('Access')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Access' ? 'text-white' : 'hover:text-white'}`}
          >
            <Key className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Access</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{activeSubPage}</h1>
              <p className="text-gray-500 text-sm md:text-base xl:text-lg">Manage campus buildings, rooms, and access control.</p>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
