import React from 'react';
import { Award, Star, Trophy, Loader2 } from 'lucide-react';
import { useBadges } from '../../../hooks/useBadges';

export default function Badges() {
  const { data: badges, isLoading } = useBadges();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 flex flex-col md:flex-row px-4 md:px-6 gap-4 md:gap-6 overflow-hidden min-h-0">
        {/* Left Sub-nav Pill */}
        <div className="w-full md:w-fit h-fit bg-[#645C9A] rounded-2xl md:rounded-[2rem] flex flex-row md:flex-col items-center justify-center p-2 md:py-6 md:px-3 xl:px-4 gap-2 md:gap-6 text-white/60 shadow-sm shrink-0 overflow-x-auto no-scrollbar md:-ml-2 lg:-ml-4">
          <button className="flex flex-col items-center gap-1 md:gap-2 text-white group min-w-[60px]">
            <Award className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Active</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Star className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Create</span>
          </button>
          <button className="flex flex-col items-center gap-1 md:gap-2 hover:text-white transition-colors min-w-[60px]">
            <Trophy className="w-5 h-5 md:w-6 md:h-6" />
            <span className="text-[9px] md:text-[10px] font-medium text-center leading-tight">Leaderboard</span>
          </button>
        </div>

        {/* White Content Card */}
        <div className="flex-1 bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 xl:p-10 shadow-sm flex flex-col min-h-0 overflow-y-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3 shrink-0">Badges</h1>
          <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base xl:text-lg shrink-0">Manage digital badges and achievements.</p>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {badges?.map((badge: any) => (
                <div key={badge.id} className="flex flex-col items-center p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-indigo-200 transition-all group">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-center mb-1">{badge.name}</h3>
                  <p className="text-[10px] text-gray-500 text-center">{badge.description}</p>
                </div>
              ))}
              {(!badges || badges.length === 0) && (
                <div className="col-span-full py-20 text-center text-gray-500 italic border border-dashed rounded-3xl">
                  No digital badges created yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
