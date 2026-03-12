import React, { useState } from 'react';
import { Users, FileText, Heart, Plus, Download, DollarSign, Loader2 } from 'lucide-react';
import { usePayroll } from '../../../hooks/useHR';

export default function Payroll() {
  const [activeTab, setActiveTab] = useState('Employees');
  const { data: payrolls, isLoading } = usePayroll();

  const renderContent = () => {
    switch (activeTab) {
      case 'Taxes':
        return <div className="py-20 text-center text-gray-400 italic">Tax compliance module coming in V2.</div>;
      case 'Benefits':
        return <div className="py-20 text-center text-gray-400 italic">Benefits administration module coming in V2.</div>;
      case 'Employees':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Payroll Records</h2>
              <div className="flex gap-2">
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"><Download className="w-4 h-4" />Export</button>
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"><DollarSign className="w-4 h-4" />Run Payroll</button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              {isLoading ? (
                 <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
              ) : payrolls?.length === 0 ? (
                 <div className="py-20 text-center text-gray-400 italic">No payroll records found.</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                    <tr>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">User ID</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Period</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Amount</th>
                      <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payrolls?.map((pay: any) => (
                      <tr key={pay.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{pay.user_id.slice(0, 8)}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">{pay.pay_period}</td>
                        <td className="py-4 px-6 text-sm font-bold text-gray-900">${pay.amount.toLocaleString()}</td>
                        <td className="py-4 px-6 text-right">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-md border border-emerald-100">{pay.status}</span>
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
          <button onClick={() => setActiveTab('Employees')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Employees' ? 'text-white' : 'hover:text-white'}`}><Users className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Employees</span></button>
          <button onClick={() => setActiveTab('Taxes')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Taxes' ? 'text-white' : 'hover:text-white'}`}><FileText className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Taxes</span></button>
          <button onClick={() => setActiveTab('Benefits')} className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Benefits' ? 'text-white' : 'hover:text-white'}`}><Heart className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Benefits</span></button>
        </div>
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
}
