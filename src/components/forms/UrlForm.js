'use client';

import { isValidUrl } from '@/utils/validators';

/**
 * UrlForm Component
 * URL input with real-time validation.
 */
export default function UrlForm({ value, onChange }) {
  const showError = value.length > 0 && !isValidUrl(value);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Enter URL
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl
                     text-white placeholder-slate-500
                     focus:outline-none focus:ring-2 transition-all duration-200
                     ${showError
                       ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                       : 'border-white/10 focus:ring-violet-500/50 focus:border-violet-500/50'
                     }`}
        />
      </div>
      {showError && (
        <p className="text-xs text-red-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd" />
          </svg>
          Please enter a valid URL
        </p>
      )}
      <p className="text-xs text-slate-500">
        https:// will be added automatically if missing
      </p>
    </div>
  );
}
