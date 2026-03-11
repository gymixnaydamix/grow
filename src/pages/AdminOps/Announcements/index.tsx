import React, { useState } from 'react';
import { Bell, Megaphone, MessageSquare, Plus, Search, Filter, MoreVertical, Edit2, Trash2, Send } from 'lucide-react';

interface AnnouncementsProps {
  activeSubPage: string;
}

export default function Announcements({ activeSubPage }: AnnouncementsProps) {
  const [activeTab, setActiveTab] = useState('All');

  const renderContent = () => {
    switch (activeTab) {
      case 'Campaigns':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Active Campaigns</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Campaign
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Fall Enrollment Drive', target: 'Prospective Parents', status: 'Active', reach: '2,450', engagement: '18%' },
                { name: 'Alumni Giving Week', target: 'Alumni', status: 'Scheduled', reach: '5,100', engagement: '-' },
                { name: 'Parent-Teacher Conference Reminder', target: 'Current Parents', status: 'Completed', reach: '1,200', engagement: '85%' },
              ].map((campaign, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      campaign.status === 'Scheduled' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{campaign.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">Target: {campaign.target}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Reach</span>
                      <span className="text-sm font-medium text-gray-900">{campaign.reach}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-500">Engagement</span>
                      <span className="text-sm font-medium text-gray-900">{campaign.engagement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Drafts':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Draft Announcements</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Draft
              </button>
            </div>
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Title</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Target Audience</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Last Edited</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { title: 'Winter Break Schedule Update', target: 'All Staff & Students', edited: '2 hours ago' },
                    { title: 'New Library Hours', target: 'Students', edited: 'Yesterday' },
                    { title: 'Staff Training Day Information', target: 'Teachers', edited: '3 days ago' },
                  ].map((draft, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{draft.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{draft.target}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{draft.edited}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Publish">
                            <Send className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
      case 'All':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">All Notifications</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Notification
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search notifications..." 
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
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Title</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Audience</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date Sent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { title: 'System Maintenance Notice', audience: 'All Users', date: 'Oct 26, 2023', status: 'Sent' },
                    { title: 'Welcome to the New Term', audience: 'Students & Parents', date: 'Sep 01, 2023', status: 'Sent' },
                    { title: 'Emergency Weather Alert', audience: 'All Users', date: 'Jan 15, 2023', status: 'Sent' },
                    { title: 'Faculty Meeting Agenda', audience: 'Teachers', date: 'Oct 20, 2023', status: 'Sent' },
                  ].map((notification, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{notification.title}</td>
                      <td className="py-4 px-6 text-sm text-gray-700">{notification.audience}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{notification.date}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {notification.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                            <MoreVertical className="w-4 h-4" />
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
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('All')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'All' ? 'text-white' : 'hover:text-white'}`}
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">All</span>
          </button>
          <button 
            onClick={() => setActiveTab('Campaigns')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Campaigns' ? 'text-white' : 'hover:text-white'}`}
          >
            <Megaphone className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Campaigns</span>
          </button>
          <button 
            onClick={() => setActiveTab('Drafts')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Drafts' ? 'text-white' : 'hover:text-white'}`}
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Drafts</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-6 md:mb-8 shrink-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{activeSubPage}</h1>
              <p className="text-gray-500 text-sm md:text-base xl:text-lg">Manage and broadcast {activeSubPage.toLowerCase()} to users.</p>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
