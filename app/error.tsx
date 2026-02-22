'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Log to monitoring in production
    console.error('[LMS Error]', error);
  }, [error]);

  const handleReset = async () => {
    setIsResetting(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    reset();
    setIsResetting(false);
  };

  return (
    <main
      className="min-h-screen bg-stone-50 flex items-center justify-center px-6"
      role="main"
      aria-labelledby="error-title"
      aria-live="assertive"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-40" />
      </div>

      <div
        className="relative text-center max-w-lg w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-2xl shadow-red-100">
              <AlertTriangle size={52} className="text-white" aria-hidden="true" />
            </div>
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-3xl border-2 border-red-300 opacity-0"
              style={{
                animation: mounted ? 'ping 2s cubic-bezier(0,0,0.2,1) infinite' : 'none',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Heading */}
        <h1
          id="error-title"
          className="text-2xl font-extrabold text-stone-900 mb-3"
        >
          حدث خطأ غير متوقع
        </h1>

        <p className="text-stone-500 text-base leading-relaxed mb-4">
          نعتذر عن هذا الخلل. يمكنك المحاولة مرة أخرى أو العودة للصفحة الرئيسية.
        </p>

        {/* Error digest badge */}
        {error.digest && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 text-xs font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" aria-hidden="true" />
            كود الخطأ: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <button
            onClick={handleReset}
            disabled={isResetting}
            aria-label="إعادة المحاولة"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-all active:scale-95 shadow-md shadow-orange-200 w-full sm:w-auto justify-center"
          >
            <RefreshCw
              size={16}
              aria-hidden="true"
              className={isResetting ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}
            />
            {isResetting ? 'جاري المحاولة...' : 'إعادة المحاولة'}
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 font-semibold text-sm hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-200 focus:ring-offset-2 transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            <Home size={16} aria-hidden="true" />
            الصفحة الرئيسية
          </Link>
        </div>

        {/* Error details collapsible — dev/support use */}
        {error.message && (
          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              aria-controls="error-details"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors focus:outline-none"
            >
              {showDetails
                ? <ChevronUp size={13} aria-hidden="true" />
                : <ChevronDown size={13} aria-hidden="true" />
              }
              {showDetails ? 'إخفاء التفاصيل' : 'عرض تفاصيل الخطأ'}
            </button>

            {showDetails && (
              <div
                id="error-details"
                className="mt-3 p-4 rounded-xl bg-stone-900 text-left overflow-auto max-h-36"
              >
                <p className="text-red-400 text-xs font-mono leading-relaxed break-all">
                  {error.message}
                </p>
                {error.stack && (
                  <p className="text-stone-500 text-xs font-mono leading-relaxed mt-2 break-all">
                    {error.stack.split('\n').slice(1, 4).join('\n')}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ping animation keyframe via style tag */}
      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </main>
  );
}