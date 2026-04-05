'use client';

/**
 * PaddingControl Component
 * Adjusts the margin/padding around the QR Code.
 */
export default function PaddingControl({ value = 0, onChange }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Padding Zone
        </label>
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-md">
          {value}px
        </span>
      </div>
      <div className="relative pt-1 flex items-center gap-4">
        <span className="text-xs text-slate-400 font-bold">0</span>
        <input
          type="range"
          min="0"
          max="50"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full relative z-10"
        />
        <span className="text-xs text-slate-400 font-bold">50</span>
      </div>
    </div>
  );
}
