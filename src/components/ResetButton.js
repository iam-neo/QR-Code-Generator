'use client';

import { useState } from 'react';

/**
 * ResetButton Component
 * Resets all QR settings to defaults with confirmation.
 */
export default function ResetButton({ onReset }) {
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (confirming) {
      onReset();
      setConfirming(false);
    } else {
      setConfirming(true);
      // Auto-cancel after 3 seconds
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <button
      id="reset-button"
      onClick={handleClick}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5
                  text-sm font-medium rounded-xl border
                  transition-all duration-300
                  ${confirming
                    ? 'bg-red-500/20 border-red-500/50 text-red-300 hover:bg-red-500/30'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-slate-300'
                  }`}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {confirming ? 'Confirm Reset?' : 'Reset All'}
    </button>
  );
}
