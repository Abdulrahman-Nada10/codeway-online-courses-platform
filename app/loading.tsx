'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFF3EB] overflow-x-hidden mt-26">
      <div className="lg:mr-75">
        <div className="h-16 bg-white border-b border-gray-100 animate-pulse" />

        <main className="p-3 sm:p-4 lg:p-3">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="text-right">
              <div className="h-7 w-32 bg-gray-200 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse" />
          </div>

          <div className="space-y-6 sm:space-y-6">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1 text-center sm:text-right space-y-3 w-full">
                  <div className="h-6 w-40 bg-gray-200 rounded-lg mx-auto sm:mx-0 animate-pulse" />
                  <div className="h-4 w-56 bg-gray-100 rounded mx-auto sm:mx-0 animate-pulse" />
                  <div className="h-4 w-44 bg-gray-100 rounded mx-auto sm:mx-0 animate-pulse" />
                  <div className="h-4 w-32 bg-gray-100 rounded mx-auto sm:mx-0 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
                  <div className="h-10 w-10 bg-orange-100 rounded-xl mb-3 animate-pulse" />
                  <div className="h-8 w-12 bg-gray-200 rounded-lg animate-pulse mb-2" />
                  <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
        <span className="text-sm text-gray-600 font-cairo">جاري التحميل...</span>
      </div>
    </div>
  );
}
