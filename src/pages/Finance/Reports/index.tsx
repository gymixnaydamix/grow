import React, { useState, useEffect } from 'react';
import { Calendar, BarChart, Sliders, Download, Filter, TrendingUp, TrendingDown, DollarSign, FileText, Plus, AlertCircle } from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useFirebase } from '../../../components/FirebaseProvider';
import { handleFirestoreError, OperationType } from '../../../utils/firestoreErrorHandler';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Monthly');
  const { isAuthReady, userRole } = useFirebase();
  
  const [invoices, setInvoices] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthReady || !auth.currentUser) {
      setLoading(false);
      return;
    }

    if (userRole !== 'finance' && userRole !== 'admin') {
      setLoading(false);
      return;
    }

    const unsubInvoices = onSnapshot(query(collection(db, 'invoices')), (snapshot) => {
      setInvoices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'invoices', auth));

    const unsubEmployees = onSnapshot(query(collection(db, 'employees')), (snapshot) => {
      setEmployees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'employees', auth));

    const unsubBudgets = onSnapshot(query(collection(db, 'budgets')), (snapshot) => {
      setBudgets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'budgets', auth));

    setLoading(false);

    return () => {
      unsubInvoices();
      unsubEmployees();
      unsubBudgets();
    };
  }, [isAuthReady, userRole]);

  const calculateMetrics = () => {
    // Basic aggregation for demonstration
    const totalRevenue = invoices
      .filter(inv => inv.type === 'Sent' && inv.status === 'Paid')
      .reduce((sum, inv) => sum + (inv.amount || 0), 0);
      
    const totalExpenses = invoices
      .filter(inv => inv.type === 'Received' && inv.status === 'Paid')
      .reduce((sum, inv) => sum + (inv.amount || 0), 0) +
      employees.reduce((sum, emp) => sum + (emp.salary || 0) / 12, 0); // Monthly salary estimate

    const netIncome = totalRevenue - totalExpenses;

    return { totalRevenue, totalExpenses, netIncome };
  };

  const metrics = calculateMetrics();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (!auth.currentUser) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 text-gray-500">
          <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
          <p>Please log in to view reports.</p>
        </div>
      );
    }

    if (userRole !== 'finance' && userRole !== 'admin') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 text-gray-500">
          <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
          <p>You do not have permission to view reports.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'Annual':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Annual Financial Report</h2>
              <div className="flex gap-2">
                <select className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Total Revenue (YTD)</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">${metrics.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-sm text-emerald-600 font-medium">Based on paid invoices</div>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Total Expenses (YTD)</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">${metrics.totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-sm text-rose-600 font-medium">Invoices + Payroll</div>
              </div>
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">Net Income (YTD)</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">${metrics.netIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-sm text-emerald-600 font-medium">Current balance</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department Budget</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Allocated</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Spent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Remaining</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgets.length > 0 ? budgets.map((budget, i) => {
                    const remaining = (budget.allocated || 0) - (budget.spent || 0);
                    return (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{budget.department}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">${(budget.allocated || 0).toLocaleString()}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">${(budget.spent || 0).toLocaleString()}</td>
                        <td className={`py-4 px-6 text-sm font-medium ${remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ${remaining.toLocaleString()}
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">No budget data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Custom':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Custom Reports</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Q3 Department Spending Analysis', date: 'Oct 15, 2023', author: 'Jane Doe', type: 'Expense Analysis' },
                { name: 'Year-over-Year Tuition Revenue', date: 'Sep 30, 2023', author: 'John Smith', type: 'Revenue Tracking' },
                { name: 'Grant Utilization Summary', date: 'Sep 15, 2023', author: 'Alice Johnson', type: 'Grant Management' },
                { name: 'Facility Maintenance Costs 2023', date: 'Aug 28, 2023', author: 'Bob Wilson', type: 'Expense Analysis' },
              ].map((report, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-50 text-gray-700 border-gray-200">
                      {report.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">Generated on {report.date} by {report.author}</p>
                  <div className="mt-auto flex gap-2">
                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-medium transition-colors">
                      View
                    </button>
                    <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Monthly':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Monthly Performance</h2>
              <div className="flex gap-2">
                <select className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Current Month</option>
                  <option>Previous Month</option>
                </select>
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 shrink-0">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-1">Total Revenue</div>
                <div className="text-xl font-bold text-gray-900">${metrics.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">From paid invoices</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-1">Total Expenses</div>
                <div className="text-xl font-bold text-gray-900">${metrics.totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-xs text-rose-600 font-medium mt-1">Invoices + Payroll</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-1">Net Cash Flow</div>
                <div className="text-xl font-bold text-gray-900">${metrics.netIncome.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">Current balance</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="text-sm font-medium text-gray-500 mb-1">Active Employees</div>
                <div className="text-xl font-bold text-gray-900">{employees.filter(e => e.status === 'Active').length}</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">On payroll</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Budgeted</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Spent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Remaining</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgets.length > 0 ? budgets.map((row, i) => {
                    const remaining = (row.allocated || 0) - (row.spent || 0);
                    const status = remaining >= 0 ? 'On Track' : 'Over Budget';
                    return (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900">{row.department}</td>
                        <td className="py-4 px-6 text-sm text-gray-500">${(row.allocated || 0).toLocaleString()}</td>
                        <td className="py-4 px-6 text-sm font-semibold text-gray-900">${(row.spent || 0).toLocaleString()}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">${remaining.toLocaleString()}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            status === 'On Track' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            'bg-rose-50 text-rose-700 border-rose-100'
                          }`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">No budget data available.</td>
                    </tr>
                  )}
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
            onClick={() => setActiveTab('Monthly')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Monthly' ? 'text-white' : 'hover:text-white'}`}
          >
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Monthly</span>
          </button>
          <button 
            onClick={() => setActiveTab('Annual')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Annual' ? 'text-white' : 'hover:text-white'}`}
          >
            <BarChart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Annual</span>
          </button>
          <button 
            onClick={() => setActiveTab('Custom')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Custom' ? 'text-white' : 'hover:text-white'}`}
          >
            <Sliders className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Custom</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
