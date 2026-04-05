'use client';

import { DOT_STYLES, CORNER_SQUARE_STYLES, CORNER_DOT_STYLES } from '@/utils/qrDefaults';

/**
 * DotStyleSelector Component
 * Visual selector for QR dot, corner square, and corner dot styles.
 */
export default function DotStyleSelector({
  dotType,
  cornerSquareType,
  cornerDotType,
  onDotChange,
  onCornerSquareChange,
  onCornerDotChange,
}) {
  return (
    <div className="space-y-5">
      {/* Dot Style */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Dot Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onDotChange(style.value)}
              className={`px-2 py-2 text-xs rounded-xl border transition-all duration-200
                ${dotType === style.value
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corner Square Style */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Corner Style
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CORNER_SQUARE_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onCornerSquareChange(style.value)}
              className={`px-2 py-2 text-xs rounded-xl border transition-all duration-200
                ${cornerSquareType === style.value
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corner Dot Style */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Corner Dot
        </label>
        <div className="grid grid-cols-3 gap-2">
          {CORNER_DOT_STYLES.map((style) => (
            <button
              key={style.value}
              onClick={() => onCornerDotChange(style.value)}
              className={`px-2 py-2 text-xs rounded-xl border transition-all duration-200
                ${cornerDotType === style.value
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
