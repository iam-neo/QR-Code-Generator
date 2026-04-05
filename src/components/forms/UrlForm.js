'use client';

import { isValidUrl } from '@/utils/validators';

/**
 * UrlForm Component
 * URL input with real-time validation and premium glow effects.
 */
export default function UrlForm({ value, onChange }) {
  const showError = value.length > 0 && !isValidUrl(value);

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
        Enter URL
      </label>
      <div className="relative group">
        {/* Animated Glow Border Frame */}
        <div className={`absolute -inset-0.5 rounded-2xl blur transition duration-500 opacity-0 group-focus-within:opacity-100
            ${showError 
              ? 'bg-gradient-to-r from-red-500 to-rose-400 opacity-30 shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
              : 'bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 opacity-30 group-focus-within:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
            }`} 
        />
        
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
            <svg 
              className={`w-5 h-5 transition-colors duration-300 ${showError ? 'text-red-400' : 'text-violet-500/70'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <input
            id="url-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com"
            className={`relative w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-[#02010a]/40 border rounded-2xl
                       text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none shadow-inner transition-all duration-300
                       ${showError
                         ? 'border-red-500/50 text-red-500 dark:text-red-400 focus:bg-red-500/5 dark:focus:bg-red-500/5'
                         : 'border-slate-200 dark:border-white/10 focus:border-violet-500/50 dark:focus:border-violet-500/50 focus:bg-white/80 dark:focus:bg-white/5'
                       }`}
          />
        </div>
      </div>
      
      {/* Error message / Helper text space */}
      <div className="h-4 pl-2">
        {showError ? (
          <p className="text-[11px] font-bold tracking-wide text-red-500 flex items-center gap-1.5 animate-fade-in">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Please enter a valid URL
          </p>
        ) : (
          <p className="text-[10px] font-medium tracking-wide text-slate-400 animate-fade-in opacity-70">
            https:// will be added automatically if missing
          </p>
        )}
      </div>
    </div>
  );
}
