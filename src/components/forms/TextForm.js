'use client';

/**
 * TextForm Component
 * Simple textarea input for plain text QR codes.
 */
export default function TextForm({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
        Enter your text
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 rounded-2xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
        <textarea
          id="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type anything here..."
          rows={4}
          maxLength={2000}
          className="relative w-full px-5 py-4 bg-white/50 dark:bg-[#02010a]/40 border border-slate-200 dark:border-white/10 rounded-2xl
                     text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none
                     focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50
                     shadow-inner transition-all duration-300"
        />
      </div>
      <div className="flex justify-end pr-2">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">
          {value.length} / 2000
        </span>
      </div>
    </div>
  );
}
