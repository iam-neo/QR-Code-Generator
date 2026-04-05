'use client';

import { ERROR_CORRECTION_LEVELS } from '@/utils/qrDefaults';

/**
 * ErrorCorrectionSelector Component
 * Segmented control for selecting QR error correction level.
 */
export default function ErrorCorrectionSelector({ value, onChange, hasLogo }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Error Correction
        </label>
        {hasLogo && (
          <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400
                           border border-amber-500/20 rounded-full">
            Auto: High
          </span>
        )}
      </div>

      <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
        {ERROR_CORRECTION_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => !hasLogo && onChange(level.value)}
            disabled={hasLogo}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-lg
                       transition-all duration-200
              ${value === level.value
                ? 'bg-violet-500/20 text-violet-300'
                : hasLogo
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'
              }`}
          >
            <span className="text-sm font-bold">{level.label}</span>
            <span className="text-[9px] opacity-70">{level.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
