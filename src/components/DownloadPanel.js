'use client';

/**
 * DownloadPanel Component
 * Provides download buttons for various QR export formats.
 */
export default function DownloadPanel({ onDownload }) {
  const formats = [
    { ext: 'png', label: 'PNG', desc: 'Best for sharing', icon: '🖼️' },
    { ext: 'svg', label: 'SVG', desc: 'Scalable vector', icon: '📐' },
    { ext: 'jpeg', label: 'JPEG', desc: 'Compressed image', icon: '📷' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-sm font-bold uppercase tracking-widest opacity-70">
        Output Format
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {formats.map((fmt) => (
          <button
            key={fmt.ext}
            id={`download-${fmt.ext}`}
            onClick={() => onDownload(fmt.ext)}
            className="relative overflow-hidden flex flex-col items-center gap-2 p-4
                       bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl
                       hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
                       active:scale-[0.97] transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <span className="text-2xl group-hover:-translate-y-1 group-hover:scale-110 drop-shadow-md transition-all duration-300">
              {fmt.icon}
            </span>
            <span className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              {fmt.label}
            </span>
            <span className="text-[10px] uppercase font-medium tracking-wide text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors text-center leading-tight">
              {fmt.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
