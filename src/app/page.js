'use client';

import dynamic from 'next/dynamic';

/**
 * Dynamically import QRApp with SSR disabled.
 * qr-code-styling requires browser APIs (canvas, DOM) and cannot run server-side.
 */
const QRApp = dynamic(() => import('@/components/QRApp'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600
                        flex items-center justify-center animate-pulse shadow-lg shadow-violet-500/25">
          <span className="text-xl text-white">⠿</span>
        </div>
        <p className="text-sm text-slate-500 animate-pulse">Loading QR Studio...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return <QRApp />;
}
