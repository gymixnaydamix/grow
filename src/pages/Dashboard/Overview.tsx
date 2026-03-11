import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, DollarSign, TrendingUp, Activity, CheckCircle, Clock, Info } from 'lucide-react';

interface OverviewData {
  activeUsers: number;
  revenue: number;
  growth: number;
  systemStatus: string;
  recentActivity: {
    id: number;
    action: string;
    time: string;
    status: 'success' | 'info' | 'warning' | 'error';
  }[];
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/overview')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch overview data', err);
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

  const statusColors = {
    success: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    info: 'text-blue-600 bg-blue-50 border-blue-100',
    warning: 'text-amber-600 bg-amber-50 border-amber-100',
    error: 'text-rose-600 bg-rose-50 border-rose-100',
  };

  const statusIcons = {
    success: <CheckCircle className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
    warning: <Activity className="w-4 h-4" />,
    error: <Activity className="w-4 h-4" />,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 h-full overflow-y-auto no-scrollbar"
    >
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-900 group-hover:scale-110 transition-transform duration-500">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-emerald-600 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              +12%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Active Users</p>
            <h3 className="text-5xl font-light tracking-tighter text-gray-900">{data.activeUsers.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-900 group-hover:scale-110 transition-transform duration-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-emerald-600 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              +8.4%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Total Revenue</p>
            <h3 className="text-5xl font-light tracking-tighter text-gray-900">${(data.revenue / 1000).toFixed(1)}k</h3>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-100 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-900 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-blue-600 text-[11px] font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Steady
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">Growth Rate</p>
            <h3 className="text-5xl font-light tracking-tighter text-gray-900">{data.growth}%</h3>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-100 transition-colors duration-500"></div>
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-gray-900 group-hover:scale-110 transition-transform duration-500">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-emerald-600 text-[11px] font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              Live
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">System Status</p>
            <h3 className="text-4xl font-light tracking-tighter text-gray-900 truncate">{data.systemStatus}</h3>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 md:p-8 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">Recent Activity</h2>
          <button className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
          <div className="space-y-3">
            {data.recentActivity.map((activity, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={activity.id} 
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl border ${statusColors[activity.status]}`}>
                    {statusIcons[activity.status]}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">{activity.action}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1 font-medium uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-gray-400 bg-white px-2 py-1 rounded-md border border-gray-100 group-hover:border-gray-200 transition-colors">
                  ID:{activity.id.toString().padStart(4, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
