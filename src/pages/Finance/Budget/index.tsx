import React, { useState, useEffect } from 'react';
import { PieChart, TrendingUp, CheckCircle, Plus, Search, Filter, MoreVertical, DollarSign, ArrowUpRight, ArrowDownRight, Activity, AlertCircle, Clock } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useFirebase } from '../../../components/FirebaseProvider';
import { handleFirestoreError, OperationType } from '../../../utils/firestoreErrorHandler';
import CreateBudgetRequestModal from './CreateBudgetRequestModal';

interface Budget {
  id: string;
  department: string;
  allocated: number;
  spent: number;
  fiscalYear: string;
}

interface BudgetRequest {
  id: string;
  department: string;
  amount: number;
  requestedBy: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: any;
}

export default function Budget() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [requests, setRequests] = useState<BudgetRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthReady, userRole } = useFirebase();
  const [isCreateRequestModalOpen, setIsCreateRequestModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !auth.currentUser || (userRole !== 'finance' && userRole !== 'admin')) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const budgetsQuery = query(collection(db, 'budgets'), orderBy('department'));
    const unsubscribeBudgets = onSnapshot(budgetsQuery, (snapshot) => {
      const budgetsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Budget[];
      setBudgets(budgetsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'budgets', auth);
      setLoading(false);
    });

    const requestsQuery = query(collection(db, 'budgetRequests'), orderBy('createdAt', 'desc'));
    const unsubscribeRequests = onSnapshot(requestsQuery, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BudgetRequest[];
      setRequests(requestsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'budgetRequests', auth);
    });

    return () => {
      unsubscribeBudgets();
      unsubscribeRequests();
    };
  }, [isAuthReady, userRole]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateTotalBudget = () => budgets.reduce((sum, b) => sum + b.allocated, 0);
  const calculateTotalSpent = () => budgets.reduce((sum, b) => sum + b.spent, 0);
  const calculateRemaining = () => calculateTotalBudget() - calculateTotalSpent();

  const handleApproveRequest = async (requestId: string) => {
    try {
      await updateDoc(doc(db, 'budgetRequests', requestId), {
        status: 'Approved'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'budgetRequests', auth);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await updateDoc(doc(db, 'budgetRequests', requestId), {
        status: 'Rejected'
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'budgetRequests', auth);
    }
  };

  const renderContent = () => {
    if (!isAuthReady || loading) {
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
          <p>Please log in to view budget information.</p>
        </div>
      );
    }

    if (userRole !== 'finance' && userRole !== 'admin') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 text-gray-500">
          <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
          <p>You do not have permission to view budget information.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'Planning':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Budget Planning (FY 2024)</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Proposal
              </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Proposed Budget</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Previous Year</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Change</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">No budget data available</td>
                    </tr>
                  ) : budgets.map((plan, i) => {
                    const previous = plan.allocated * 0.95; // Mock previous year data
                    const changePercent = ((plan.allocated - previous) / previous * 100).toFixed(1);
                    const isPositive = parseFloat(changePercent) >= 0;
                    return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                      <td className="py-4 px-6 font-medium text-gray-900">{plan.department}</td>
                      <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{formatCurrency(plan.allocated)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatCurrency(previous)}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {isPositive ? '+' : ''}{changePercent}%
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100`}>
                          Approved
                        </span>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Approvals':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsCreateRequestModalOpen(true)}
                  className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Request
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Request ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Amount</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Requested By</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">No pending requests</td>
                    </tr>
                  ) : requests.map((req, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-indigo-600 cursor-pointer hover:underline">{req.id.slice(0, 8)}...</td>
                      <td className="py-4 px-6 text-sm text-gray-900">{req.department}</td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">{formatCurrency(req.amount)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{req.requestedBy}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">
                        {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          req.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          req.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {req.status === 'Approved' && <CheckCircle className="w-3 h-3" />}
                          {req.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {req.status === 'Rejected' && <AlertCircle className="w-3 h-3" />}
                          {req.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {req.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleApproveRequest(req.id)}
                              className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-medium transition-colors"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectRequest(req.id)}
                              className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-medium transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
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
              <div className="flex items-center gap-2">
                <select className="bg-white border border-gray-200 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>FY 2023-2024</option>
                  <option>FY 2022-2023</option>
                </select>
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-indigo-900">Total Budget</span>
                </div>
                <div className="text-2xl font-bold text-indigo-900 mb-1">{formatCurrency(totalBudget)}</div>
                <div className="text-xs text-indigo-700 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  +5.2% from last year
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-emerald-900">Spent to Date</span>
                </div>
                <div className="text-2xl font-bold text-emerald-900 mb-1">{formatCurrency(totalSpent)}</div>
                <div className="text-xs text-emerald-700">{spentPercent.toFixed(1)}% of total budget</div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-blue-900">Remaining</span>
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">{formatCurrency(remaining)}</div>
                <div className="text-xs text-blue-700">{remainingPercent.toFixed(1)}% of total budget</div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Department</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Allocated</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Spent</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Remaining</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Utilization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {budgets.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">No budget data available</td>
                    </tr>
                  ) : budgets.map((item, i) => {
                    const itemRemaining = item.allocated - item.spent;
                    const util = item.allocated > 0 ? (item.spent / item.allocated) * 100 : 0;
                    return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{item.department}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatCurrency(item.allocated)}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{formatCurrency(item.spent)}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">{formatCurrency(itemRemaining)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${util > 80 ? 'bg-rose-500' : util > 60 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                              style={{ width: `${Math.min(util, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-500 w-8">{util.toFixed(0)}%</span>
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
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button 
            onClick={() => setActiveTab('Overview')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Overview' ? 'text-white' : 'hover:text-white'}`}
          >
            <PieChart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('Planning')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Planning' ? 'text-white' : 'hover:text-white'}`}
          >
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Planning</span>
          </button>
          <button 
            onClick={() => setActiveTab('Approvals')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Approvals' ? 'text-white' : 'hover:text-white'}`}
          >
            <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Approvals</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
      
      <CreateBudgetRequestModal 
        isOpen={isCreateRequestModalOpen}
        onClose={() => setIsCreateRequestModalOpen(false)}
      />
    </div>
  );
}
