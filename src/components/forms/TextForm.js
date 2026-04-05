'use client';

/**
 * TextForm Component
 * Simple textarea input for plain text QR codes.
 */
export default function TextForm({ value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-300">
        Enter your text
      </label>
      <textarea
        id="text-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type anything here..."
        rows={4}
        maxLength={2000}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                   text-white placeholder-slate-500 resize-none
                   focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                   transition-all duration-200"
      />
      <div className="flex justify-end">
        <span className="text-xs text-slate-500">
          {value.length} / 2000
        </span>
      </div>
    </div>
  );
}
