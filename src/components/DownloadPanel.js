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
    <div className="space-y-3">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        Download
      </label>
      <div className="grid grid-cols-3 gap-2">
        {formats.map((fmt) => (
          <button
            key={fmt.ext}
            id={`download-${fmt.ext}`}
            onClick={() => onDownload(fmt.ext)}
            className="flex flex-col items-center gap-1.5 p-3
                       bg-white/5 border border-white/10 rounded-xl
                       hover:bg-gradient-to-b hover:from-violet-500/10 hover:to-transparent
                       hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5
                       active:scale-95 transition-all duration-200 group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform duration-200">
              {fmt.icon}
            </span>
            <span className="text-sm font-medium text-slate-300 group-hover:text-violet-300 transition-colors">
              {fmt.label}
            </span>
            <span className="text-[10px] text-slate-500">{fmt.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
