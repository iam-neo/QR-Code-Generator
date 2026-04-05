'use client';

/**
 * SizeControl Component
 * Range slider with numeric display for QR code size.
 */
export default function SizeControl({ size, onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Size
        </label>
        <div className="flex items-center gap-1.5">
          <input
            id="size-input"
            type="number"
            value={size}
            onChange={(e) => {
              const val = Math.min(1000, Math.max(200, Number(e.target.value)));
              onChange(val);
            }}
            min={200}
            max={1000}
            step={50}
            className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg
                       text-xs text-slate-300 text-center font-mono
                       focus:outline-none focus:ring-1 focus:ring-violet-500/50"
          />
          <span className="text-xs text-slate-500">px</span>
        </div>
      </div>
      <input
        type="range"
        id="size-slider"
        min={200}
        max={1000}
        step={50}
        value={size}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-violet-500"
      />
      <div className="flex justify-between text-[10px] text-slate-600">
        <span>200px</span>
        <span>1000px</span>
      </div>
    </div>
  );
}
