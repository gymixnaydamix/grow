import React, { useState } from 'react';
import { MessageSquare, Send, Inbox, Search, Edit, MoreVertical, Star, Paperclip, Reply, Loader2 } from 'lucide-react';
import { useMessages } from '../../../hooks/useMessages';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const { data: messages, isLoading } = useMessages();

  const renderContent = () => {
    switch (activeTab) {
      case 'Sent':
      case 'Drafts':
        return (
          <div className="flex-1 flex flex-col min-h-0 items-center justify-center text-gray-500">
            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
            <p>No messages in {activeTab.toLowerCase()}</p>
          </div>
        );
      case 'Inbox':
      default:
        const selectedMessage = messages?.find((m: any) => m.id === selectedMessageId);

        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Inbox</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                  <Edit className="w-4 h-4" />
                  Compose
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex min-h-0 border border-gray-200 rounded-2xl overflow-hidden">
              {/* Message List */}
              <div className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50 ${selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
                <div className="overflow-y-auto flex-1">
                  {isLoading ? (
                    <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-indigo-500" /></div>
                  ) : messages?.length === 0 ? (
                    <div className="p-10 text-center text-gray-400">No messages found</div>
                  ) : (
                    messages?.map((msg: any) => (
                      <div
                        key={msg.id}
                        onClick={() => setSelectedMessageId(msg.id)}
                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                          selectedMessageId === msg.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' :
                          'bg-transparent border-l-4 border-l-transparent hover:bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-gray-900 truncate pr-2">
                            From: {msg.sender_id.slice(0, 8)}
                          </h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="text-sm text-gray-800 font-semibold truncate">
                            {msg.subject || '(No Subject)'}
                          </h5>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2">{msg.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Message Detail */}
              <div className={`flex-1 flex flex-col bg-white ${!selectedMessageId ? 'hidden md:flex' : 'flex'}`}>
                {selectedMessage ? (
                  <>
                    <div className="p-6 border-b border-gray-100 shrink-0">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {selectedMessage.subject || '(No Subject)'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                            <Star className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Reply className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                          {selectedMessage.sender_id.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">User {selectedMessage.sender_id.slice(0, 8)}</p>
                          <p className="text-xs text-gray-500">to me • {new Date(selectedMessage.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 overflow-y-auto text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.content}
                    </div>
                    <div className="p-4 border-t border-gray-100 shrink-0 bg-gray-50/50">
                      <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-end gap-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                        <textarea 
                          placeholder="Reply..." 
                          className="flex-1 max-h-32 min-h-[40px] p-2 resize-none focus:outline-none text-sm"
                          rows={1}
                        ></textarea>
                        <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shrink-0">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                    <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                    <p>Select a message to read</p>
                  </div>
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
          <button 
            onClick={() => setActiveTab('Inbox')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Inbox' ? 'text-white' : 'hover:text-white'}`}
          >
            <Inbox className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Inbox</span>
          </button>
          <button 
            onClick={() => setActiveTab('Sent')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Sent' ? 'text-white' : 'hover:text-white'}`}
          >
            <Send className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Sent</span>
          </button>
          <button 
            onClick={() => setActiveTab('Drafts')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Drafts' ? 'text-white' : 'hover:text-white'}`}
          >
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Drafts</span>
          </button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
