import React, { useState } from 'react';
import { Shield, Search, CheckCircle, Loader2 } from 'lucide-react';
import { useCertificates } from '../../../hooks/useCertificates';

export default function Verification() {
  const [certId, setCertId] = useState('');
  const { data: certificates } = useCertificates();
  const [result, setResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const cert = certificates?.find((c: any) => c.id.startsWith(certId) || c.id === certId);
      setResult(cert || 'NOT_FOUND');
      setIsVerifying(false);
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Search className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Verify</span></button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]"><Shield className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Requests</span></button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]"><CheckCircle className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Logs</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Verification Portal</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base">Instant credential verification via certificate ID.</p>

          <div className="max-w-xl">
            <div className="flex gap-4 mb-8">
               <input
                 type="text"
                 value={certId}
                 onChange={(e) => setCertId(e.target.value)}
                 placeholder="Enter Certificate ID..."
                 className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
               />
               <button
                 onClick={handleVerify}
                 disabled={!certId || isVerifying}
                 className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
               >
                 {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
                 Verify
               </button>
            </div>

            {result === 'NOT_FOUND' && (
               <div className="p-6 bg-red-50 border border-red-100 rounded-3xl text-center">
                 <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Shield className="w-8 h-8" />
                 </div>
                 <h3 className="text-lg font-bold text-red-900 mb-1">Invalid Certificate</h3>
                 <p className="text-red-700 text-sm">No record found matching the provided ID. Please check the spelling.</p>
               </div>
            )}

            {result && result !== 'NOT_FOUND' && (
               <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-emerald-900 uppercase">{result.type} Verified</h3>
                      <p className="text-emerald-700 text-sm font-medium">Valid Credential • {result.status}</p>
                    </div>
                 </div>
                 <div className="space-y-3 pt-6 border-t border-emerald-100">
                    <div className="flex justify-between text-sm"><span className="text-emerald-600">Student ID</span><span className="font-bold text-emerald-900">{result.student_id}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-emerald-600">Issued On</span><span className="font-bold text-emerald-900">{new Date(result.issue_date).toLocaleDateString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-emerald-600">Digital Signature</span><span className="font-mono text-xs text-emerald-900">{result.id}</span></div>
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
