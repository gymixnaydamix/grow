import React, { useState } from 'react';
import { PieChart, TrendingUp, CheckCircle, Plus, Filter, DollarSign, ArrowUpRight, Activity, Loader2 } from 'lucide-react';
import { useBudgets } from '../../../hooks/useFinance';

export default function Budget() {
  const [activeTab, setActiveTab] = useState('Overview');
  const { data: budgets, isLoading } = useBudgets();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotalBudget = () => budgets?.reduce((sum: number, b: any) => sum + b.allocated, 0) || 0;
  const calculateTotalSpent = () => budgets?.reduce((sum: number, b: any) => sum + b.spent, 0) || 0;
  const calculateRemaining = () => calculateTotalBudget() - calculateTotalSpent();

  const renderContent = () => {
    switch (activeTab) {
      case 'Planning':
        return <div className="py-20 text-center text-gray-400 italic">Advanced budget planning is coming in V2.</div>;
      case 'Approvals':
        return <div className="py-20 text-center text-gray-400 italic">No pending budget approvals.</div>;
      case 'Overview':
      default:
        const totalBudget = calculateTotalBudget();
        const totalSpent = calculateTotalSpent();
        const remaining = calculateRemaining();
        const spentPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
        const remainingPercent = totalBudget > 0 ? (remaining / totalBudget) * 100 : 0;

        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Budget Overview</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center"><DollarSign className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-indigo-900">Total Budget</span>
                </div>
                <div className="text-2xl font-bold text-indigo-900 mb-1">{formatCurrency(totalBudget)}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-emerald-900">Spent to Date</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900 mb-1">{formatCurrency(totalSpent)}</div>
                <div className="text-xs text-emerald-700">{spentPercent.toFixed(1)}% of total</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><PieChart className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-blue-900">Remaining</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">{formatCurrency(remaining)}</div>
                <div className="text-xs text-blue-700">{remainingPercent.toFixed(1)}% available</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Allocated</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Spent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Utilization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr><td colSpan={4} className="py-10 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500" /></td></tr>
                  ) : budgets?.length === 0 ? (
                    <tr><td colSpan={4} className="py-10 text-center text-gray-400">No budget records found.</td></tr>
                  ) : budgets.map((item: any, i: number) => {
                    const util = item.allocated > 0 ? (item.spent / item.allocated) * 100 : 0;
                    return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900 uppercase tracking-wide text-xs">{item.department}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatCurrency(item.allocated)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatCurrency(item.spent)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${util > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(util, 100)}%` }}></div>
                          </div>
                          <span className="text-xs font-medium text-gray-500">{util.toFixed(0)}%</span>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button onClick={() => setActiveTab('Overview')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Overview' ? 'text-white' : 'hover:text-white'}`}><PieChart className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span></button>
          <button onClick={() => setActiveTab('Planning')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Planning' ? 'text-white' : 'hover:text-white'}`}><TrendingUp className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Planning</span></button>
          <button onClick={() => setActiveTab('Approvals')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Approvals' ? 'text-white' : 'hover:text-white'}`}><CheckCircle className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Approvals</span></button>
        </div>
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
}
