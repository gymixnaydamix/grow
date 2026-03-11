import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, HardDrive, Network, Zap, Activity } from 'lucide-react';

interface MetricsData {
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
  latency: number;
  uptime: string;
  errorRate: number;
}

export default function Metrics() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch metrics data', err);
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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 h-full overflow-y-auto no-scrollbar"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CPU & Memory Card */}
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-10 relative z-10 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-indigo-500" />
            Compute Resources
          </h2>

          <div className="space-y-10 relative z-10">
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-gray-900 text-sm font-semibold">CPU Usage</span>
                <span className="text-4xl font-light tracking-tighter text-gray-900">{data.cpuUsage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.cpuUsage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gray-900 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="text-gray-900 text-sm font-semibold">Memory Usage</span>
                <span className="text-4xl font-light tracking-tighter text-gray-900">{data.memoryUsage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${data.memoryUsage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Network & Performance Card */}
        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-10 relative z-10 flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-500" />
            Network & Performance
          </h2>

          <div className="grid grid-cols-2 gap-4 md:gap-6 relative z-10">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Traffic</span>
              </div>
              <div className="text-4xl font-light tracking-tighter text-gray-900">{data.networkTraffic} <span className="text-sm font-medium text-gray-400 tracking-normal">MB/s</span></div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <HardDrive className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Latency</span>
              </div>
              <div className="text-4xl font-light tracking-tighter text-gray-900">{data.latency} <span className="text-sm font-medium text-gray-400 tracking-normal">ms</span></div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Uptime</span>
              </div>
              <div className="text-4xl font-light tracking-tighter text-gray-900">{data.uptime}</div>
            </div>

            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-gray-500 mb-3">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Error Rate</span>
              </div>
              <div className="text-4xl font-light tracking-tighter text-gray-900">{data.errorRate}%</div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
