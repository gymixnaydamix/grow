import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PieChart, Target, Zap } from 'lucide-react';

interface AnalyticsData {
  userEngagement: { day: string; value: number }[];
  conversionRate: number;
  bounceRate: number;
  topSources: { source: string; percentage: number }[];
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch analytics data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 h-full overflow-y-auto no-scrollbar"
    >
      {/* Main Chart Area */}
      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 md:p-8 flex flex-col min-h-[400px]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold flex items-center gap-2">
              <PieChart className="w-4 h-4 text-indigo-500" />
              User Engagement
            </h2>
            <p className="text-3xl font-light tracking-tighter text-gray-900 mt-2">Daily Active Users</p>
          </div>
          <div className="flex gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-900 bg-white rounded-lg shadow-sm border border-gray-200">7D</button>
            <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors">30D</button>
            <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-900 transition-colors">YTD</button>
          </div>
        </div>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.userEngagement} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#9CA3AF" 
                tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#9CA3AF" 
                tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }}
                tickLine={false}
                axisLine={false}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderColor: '#F3F4F6', borderRadius: '16px', color: '#111827', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#111827', fontWeight: 600 }}
              />
              <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Conversion & Bounce */}
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 flex flex-col justify-center gap-8">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Conversion Rate</p>
              <h3 className="text-4xl font-light tracking-tighter text-gray-900">{data.conversionRate}%</h3>
            </div>
          </div>
          
          <div className="w-full h-px bg-gray-100"></div>

          <div className="flex items-center gap-5">
            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
              <Zap className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">Bounce Rate</p>
              <h3 className="text-4xl font-light tracking-tighter text-gray-900">{data.bounceRate}%</h3>
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="lg:col-span-2 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 flex flex-col">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-8">Traffic Sources</h2>
          <div className="flex-1 w-full min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topSources} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 600 }} width={120} />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#F3F4F6', borderRadius: '16px', color: '#111827', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="percentage" fill="#111827" radius={[0, 8, 8, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
