'use client';

import { checkQRContrast } from '@/utils/contrastUtils';

/**
 * ColorPicker Component
 * Dual color picker for foreground/background with contrast warnings.
 */
export default function ColorPicker({ fgColor, bgColor, onFgChange, onBgChange, useGradient, onToggleGradient }) {
  const contrast = checkQRContrast(fgColor, bgColor);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-300">Colors</h3>
        <button
          onClick={onToggleGradient}
          className={`px-3 py-1 text-xs rounded-lg border transition-all duration-200
            ${useGradient
              ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
            }`}
        >
          {useGradient ? '✦ Gradient ON' : 'Gradient'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Foreground */}
        <div className="space-y-2">
          <label className="block text-xs text-slate-400">Foreground</label>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
            <input
              type="color"
              id="fg-color-picker"
              value={fgColor}
              onChange={(e) => onFgChange(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent
                         [&::-webkit-color-swatch-wrapper]:p-0
                         [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
            />
            <span className="text-xs text-slate-400 font-mono uppercase">{fgColor}</span>
          </div>
        </div>

        {/* Background */}
        <div className="space-y-2">
          <label className="block text-xs text-slate-400">Background</label>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
            <input
              type="color"
              id="bg-color-picker"
              value={bgColor}
              onChange={(e) => onBgChange(e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent
                         [&::-webkit-color-swatch-wrapper]:p-0
                         [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
            />
            <span className="text-xs text-slate-400 font-mono uppercase">{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Contrast indicator */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs
        ${contrast.ok
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'bg-red-500/10 text-red-400 border border-red-500/20'
        }`}>
        <div className={`w-2 h-2 rounded-full ${contrast.ok ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span>{contrast.message}</span>
        <span className="ml-auto font-mono">{contrast.ratio.toFixed(1)}:1</span>
      </div>
    </div>
  );
}
