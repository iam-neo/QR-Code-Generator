'use client';

import { motion } from 'framer-motion';
import { DATA_TYPES } from '@/utils/qrDefaults';

/**
 * DataTypeSelector Component
 * Tab-style selector using framer-motion layoutId for premium sliding pills.
 */
export default function DataTypeSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/5 dark:bg-white/5 rounded-[1.25rem] border border-slate-200/50 dark:border-white/10 shadow-inner">
      {DATA_TYPES.map((type) => {
        const isActive = value === type.value;
        return (
          <button
            key={type.value}
            id={`tab-${type.value}`}
            onClick={() => onChange(type.value)}
            className={`relative flex-1 flex items-center justify-center gap-2 px-3 py-3 sm:py-4
                       text-sm font-bold rounded-xl outline-none transition-colors duration-200
                       ${isActive
                         ? 'text-white'
                         : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                       }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                style={{ backgroundSize: '200% 200%' }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            <span className="relative z-10 text-lg drop-shadow-md">{type.icon}</span>
            <span className="relative z-10 hidden sm:inline tracking-wide drop-shadow-md">
              {type.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
