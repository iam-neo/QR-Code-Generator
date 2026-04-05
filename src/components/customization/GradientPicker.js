'use client';

/**
 * GradientPicker Component
 * Controls for gradient color stops, angle, and type.
 */
export default function GradientPicker({ gradient, onChange }) {
  const handleChange = (key, val) => {
    onChange({ ...gradient, [key]: val });
  };

  return (
    <div className="space-y-4 pl-0.5">
      {/* Gradient type */}
      <div className="flex gap-2">
        {['linear', 'radial'].map((type) => (
          <button
            key={type}
            onClick={() => handleChange('type', type)}
            className={`flex-1 px-3 py-2 text-xs rounded-xl border transition-all duration-200 capitalize
              ${gradient.type === type
                ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Color stops */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="block text-xs text-slate-400">Color 1</label>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
            <input
              type="color"
              value={gradient.color1}
              onChange={(e) => handleChange('color1', e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent
                         [&::-webkit-color-swatch-wrapper]:p-0
                         [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
            />
            <span className="text-xs text-slate-400 font-mono uppercase">{gradient.color1}</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-xs text-slate-400">Color 2</label>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
            <input
              type="color"
              value={gradient.color2}
              onChange={(e) => handleChange('color2', e.target.value)}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent
                         [&::-webkit-color-swatch-wrapper]:p-0
                         [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
            />
            <span className="text-xs text-slate-400 font-mono uppercase">{gradient.color2}</span>
          </div>
        </div>
      </div>

      {/* Preview bar */}
      <div
        className="h-6 rounded-lg border border-white/10"
        style={{
          background: gradient.type === 'linear'
            ? `linear-gradient(${gradient.rotation}deg, ${gradient.color1}, ${gradient.color2})`
            : `radial-gradient(circle, ${gradient.color1}, ${gradient.color2})`,
        }}
      />

      {/* Rotation (linear only) */}
      {gradient.type === 'linear' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">Rotation</label>
            <span className="text-xs text-slate-400 font-mono">{gradient.rotation}°</span>
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={gradient.rotation}
            onChange={(e) => handleChange('rotation', Number(e.target.value))}
            className="w-full accent-violet-500"
          />
        </div>
      )}
    </div>
  );
}
