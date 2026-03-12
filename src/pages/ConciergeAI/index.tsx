import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Paperclip, Image as ImageIcon, Mic, FileText, Trash2, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import apiClient from '../../lib/api-client';
import { useDocuments, useIngestDocument } from '../../hooks/useDocuments';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ConciergeAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello Admin. I am your AI Concierge. How can I assist you with school operations today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'documents'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Document Management State
  const { data: documents, isLoading: isLoadingDocs } = useDocuments();
  const ingestMutation = useIngestDocument();
  const [isAddDocModalOpen, setIsAddDocModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ title: '', content: '', type: 'policy' });
  const [uploadProgress, setUploadProgress] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/concierge/chat', { message: input });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.reply || 'I apologize, but I could not generate a response.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl md:rounded-[2rem] shadow-sm overflow-hidden m-4 md:m-6 border border-gray-100">
      {/* Header */}
      <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'chat' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'documents' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Knowledge Base
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Concierge AI</h2>
            <p className="text-xs text-gray-500">Powered by Gemini</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>

      {/* Messages Area */}
      {activeTab === 'chat' ? (
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
              msg.role === 'user' 
                ? 'bg-indigo-100 text-indigo-600' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`px-5 py-3.5 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#4F46E5] text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
              }`}>
                {msg.role === 'user' ? (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="text-sm prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-50 prose-pre:text-gray-800 prose-pre:border prose-pre:border-gray-200">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-gray-400 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
              <span className="text-sm text-gray-500">Concierge is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Training Documents</h3>
            <button
              onClick={() => setIsAddDocModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Document
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isLoadingDocs ? (
              <div className="col-span-full py-12 flex justify-center">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
              </div>
            ) : documents?.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-500 border-2 border-dashed border-gray-100 rounded-3xl">
                No documents uploaded yet. Add documents to train your Concierge AI.
              </div>
            ) : (
              documents?.map((doc: any) => (
                <div key={doc.id} className="p-4 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{doc.type} • {new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Input Area (Only for chat) */}
      {activeTab === 'chat' && (
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-300 transition-all">
          <div className="flex gap-1 pb-1 pl-1">
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Concierge AI to analyze data, generate reports, or manage operations..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-sm text-gray-700 placeholder:text-gray-400"
            rows={1}
          />
          
          <div className="flex gap-1 pb-1 pr-1">
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-[#4F46E5] text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-[#4F46E5] transition-colors shadow-sm"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">Concierge AI can make mistakes. Consider verifying important operational data.</span>
        </div>
      </div>
      )}

      {/* Add Document Modal */}
      {isAddDocModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Document to Knowledge Base</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  placeholder="e.g. Student Conduct Policy 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                   value={newDoc.type}
                   onChange={(e) => setNewDoc({...newDoc, type: e.target.value})}
                   className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                >
                  <option value="policy">Policy</option>
                  <option value="curriculum">Curriculum</option>
                  <option value="handbook">Handbook</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  rows={6}
                  value={newDoc.content}
                  onChange={(e) => setNewDoc({...newDoc, content: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl resize-none"
                  placeholder="Paste the document text content here..."
                />
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setIsAddDocModalOpen(false)}
                className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-2xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  // Simulate upload progress
                  setUploadProgress(1);
                  const interval = setInterval(() => {
                    setUploadProgress(prev => {
                      if (prev >= 95) {
                        clearInterval(interval);
                        return prev;
                      }
                      return prev + Math.random() * 20;
                    });
                  }, 100);

                  await ingestMutation.mutateAsync(newDoc);

                  clearInterval(interval);
                  setUploadProgress(100);
                  setTimeout(() => {
                    setIsAddDocModalOpen(false);
                    setNewDoc({ title: '', content: '', type: 'policy' });
                    setUploadProgress(0);
                  }, 500);
                }}
                disabled={ingestMutation.isPending || !newDoc.title || !newDoc.content}
                className="relative overflow-hidden flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50"
              >
                {uploadProgress > 0 && (
                  <div
                    className="absolute inset-0 bg-indigo-500 transition-all duration-300 origin-left"
                    style={{ transform: `scaleX(${uploadProgress / 100})` }}
                  />
                )}
                <span className="relative z-10">
                  {ingestMutation.isPending ? 'Ingesting...' : 'Ingest Document'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
