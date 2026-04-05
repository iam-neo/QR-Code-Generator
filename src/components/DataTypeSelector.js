'use client';

/**
 * DataTypeSelector Component
 * Tab-style selector for choosing QR data type.
 */
import { DATA_TYPES } from '@/utils/qrDefaults';

export default function DataTypeSelector({ value, onChange }) {
  return (
    <div className="flex gap-1.5 p-1 bg-white/5 rounded-2xl border border-white/10">
      {DATA_TYPES.map((type) => (
        <button
          key={type.value}
          id={`tab-${type.value}`}
          onClick={() => onChange(type.value)}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5
                     text-sm font-medium rounded-xl transition-all duration-300
                     ${value === type.value
                       ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25'
                       : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                     }`}
        >
          <span className="text-base">{type.icon}</span>
          <span className="hidden sm:inline">{type.label}</span>
        </button>
      ))}
    </div>
  );
}
