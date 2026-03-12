import React from 'react';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
}

export function OverviewSkeleton() {
  return (
    <div className="flex flex-col gap-6 h-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-6 h-48 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>
            <div>
              <Skeleton className="w-24 h-3 mb-2" />
              <Skeleton className="w-32 h-10" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex-1 flex flex-col shadow-sm">
        <div className="flex justify-between mb-8">
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50">
              <div className="flex items-center gap-4 w-full">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <div className="flex-1">
                  <Skeleton className="w-1/2 h-4 mb-2" />
                  <Skeleton className="w-1/4 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
