import React from 'react';
import { Users, Building, Briefcase, Loader2, Mail } from 'lucide-react';
import { useStaffDirectory } from '../../../hooks/useStaff';

export default function Directory() {
  const { data: staff, isLoading } = useStaffDirectory();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]"><Users className="w-5 h-5 md:w-6 md:h-6" /><span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">All Staff</span></button>
        </div>

        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-hidden">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 shrink-0">Staff Directory</h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base shrink-0">Browse and manage school personnel.</p>

          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
               <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {staff?.map((person: any) => (
                    <div key={person.id} className="p-4 border border-gray-100 rounded-2xl hover:border-indigo-200 transition-colors bg-gray-50/20">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold uppercase">
                             {person.name?.charAt(0)}
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900">{person.name}</h4>
                             <p className="text-xs text-indigo-600 font-medium uppercase tracking-wider">{person.role}</p>
                          </div>
                       </div>
                       <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-gray-500 text-sm">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{person.email}</span>
                       </div>
                    </div>
                  ))}
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
