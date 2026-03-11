import React, { useState, useEffect } from 'react';
import { Users, FileText, Heart, Plus, Search, Filter, MoreVertical, Download, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { useFirebase } from '../../../components/FirebaseProvider';
import { handleFirestoreError, OperationType } from '../../../utils/firestoreErrorHandler';
import AddEmployeeModal from './AddEmployeeModal';

export default function Payroll() {
  const [activeTab, setActiveTab] = useState('Employees');
  const { isAuthReady, userRole } = useFirebase();
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthReady || !auth.currentUser) {
      setLoading(false);
      return;
    }

    // Only Finance or Admin can read employees based on our rules
    if (userRole !== 'finance' && userRole !== 'admin') {
      setLoading(false);
      return;
    }

    const path = 'employees';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEmployees = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(fetchedEmployees);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path, auth);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthReady, userRole]);

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
          <p>Please log in to view payroll information.</p>
        </div>
      );
    }

    if (userRole !== 'finance' && userRole !== 'admin') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 text-gray-500">
          <AlertCircle className="w-12 h-12 mb-4 text-gray-400" />
          <p>You do not have permission to view payroll information.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'Taxes':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Tax Documents</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Generate W-2s
              </button>
            </div>
            
            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Document Type</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Tax Year</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Filing Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Date Generated</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { type: 'Form 941 (Q3)', year: '2023', status: 'Filed', date: 'Oct 15, 2023' },
                    { type: 'State Withholding', year: '2023', status: 'Pending', date: 'Oct 28, 2023' },
                    { type: 'Form W-2 (All Employees)', year: '2022', status: 'Filed', date: 'Jan 20, 2023' },
                    { type: 'Form 1099-MISC', year: '2022', status: 'Filed', date: 'Jan 25, 2023' },
                  ].map((doc, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6 font-medium text-gray-900">{doc.type}</td>
                      <td className="py-4 px-6 text-sm text-gray-500">{doc.year}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          doc.status === 'Filed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          'bg-amber-50 text-amber-700 border-amber-100'
                        }`}>
                          {doc.status === 'Filed' && <CheckCircle className="w-3 h-3" />}
                          {doc.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{doc.date}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Benefits':
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Benefits Administration</h2>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Plan
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto pb-4">
              {[
                { name: 'Health Insurance (PPO)', provider: 'BlueCross', enrolled: 145, cost: '$450/mo', status: 'Active' },
                { name: 'Dental Plan', provider: 'Delta Dental', enrolled: 132, cost: '$45/mo', status: 'Active' },
                { name: 'Vision Plan', provider: 'VSP', enrolled: 118, cost: '$15/mo', status: 'Active' },
                { name: '401(k) Matching', provider: 'Fidelity', enrolled: 156, cost: 'Up to 5%', status: 'Active' },
                { name: 'Transit Commuter', provider: 'WageWorks', enrolled: 45, cost: 'Pre-tax', status: 'Active' },
              ].map((plan, i) => (
                <div key={i} className="p-5 border border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-100">
                      {plan.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">Provider: {plan.provider}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Enrolled</span>
                      <span className="text-sm font-medium text-gray-900">{plan.enrolled} Employees</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-gray-500">Employer Cost</span>
                      <span className="text-sm font-medium text-gray-900">{plan.cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Employees':
      default:
        return (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-xl font-bold text-gray-900">Employee Payroll</h2>
              <div className="flex gap-2">
                <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={() => setIsAddEmployeeModalOpen(true)}
                  className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Employee
                </button>
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Run Payroll
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search employees..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Employee</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Role</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Type</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Salary / Rate</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">Next Pay Date</th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {employees.length > 0 ? employees.map((emp, i) => (
                    <tr key={emp.id || i} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`} alt={emp.name} className="w-8 h-8 rounded-full border border-gray-200" />
                          <span className="font-medium text-gray-900">{emp.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{emp.role}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                          emp.employmentType === 'Salaried' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {emp.employmentType}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm font-semibold text-gray-900">
                        ${emp.salary?.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        {emp.employmentType === 'Salaried' ? '/yr' : '/hr'}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500">{emp.nextPayDate ? new Date(emp.nextPayDate).toLocaleDateString() : '-'}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Details">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">No employees found.</td>
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
            onClick={() => setActiveTab('Employees')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Employees' ? 'text-white' : 'hover:text-white'}`}
          >
            <Users className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Employees</span>
          </button>
          <button 
            onClick={() => setActiveTab('Taxes')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Taxes' ? 'text-white' : 'hover:text-white'}`}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Taxes</span>
          </button>
          <button 
            onClick={() => setActiveTab('Benefits')}
            className={`flex flex-col items-center gap-1 md:gap-2 group min-w-[60px] transition-colors ${activeTab === 'Benefits' ? 'text-white' : 'hover:text-white'}`}
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Benefits</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          {renderContent()}
        </div>
      </div>
      
      <AddEmployeeModal 
        isOpen={isAddEmployeeModalOpen}
        onClose={() => setIsAddEmployeeModalOpen(false)}
      />
    </div>
  );
}
