import React, { useState } from 'react';
import { Bell, Megaphone, MessageSquare, Plus, Search, Filter, MoreVertical, Edit2, Trash2, Send, Loader2 } from 'lucide-react';
import { useAnnouncements } from '../../../hooks/useAdminOps';

interface AnnouncementsProps {
  activeSubPage: string;
}

export default function Announcements({ activeSubPage }: AnnouncementsProps) {
  const [activeTab, setActiveTab] = useState('All');
  const { data: announcements, isLoading } = useAnnouncements();

  const renderContent = () => {
    switch (activeTab) {
      case 'Campaigns':
        return (
          <div className="flex-1 flex flex-col min-h-0">
             <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed">Marketing campaigns module is planned for V2.</div>
          </div>
        );
      case 'Drafts':
        return (
          <div className="flex-1 flex flex-col min-h-0">
             <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed">No draft announcements.</div>
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
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : announcements?.length === 0 ? (
                <div className="py-20 text-center text-gray-400 italic">No announcements found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Title</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Audience</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date Sent</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {announcements?.map((notification: any) => (
                      <tr key={notification.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="py-4 px-6 font-medium text-gray-900">{notification.title}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{notification.target_audience}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{new Date(notification.created_at).toLocaleDateString()}</td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          <button onClick={() => setActiveTab('All')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'All' ? 'text-white' : 'hover:text-white'}`}><Bell className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">All</span></button>
          <button onClick={() => setActiveTab('Campaigns')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Campaigns' ? 'text-white' : 'hover:text-white'}`}><Megaphone className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Campaigns</span></button>
          <button onClick={() => setActiveTab('Drafts')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Drafts' ? 'text-white' : 'hover:text-white'}`}><MessageSquare className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Drafts</span></button>
        </div>
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
