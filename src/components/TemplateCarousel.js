'use client';

import { motion } from 'framer-motion';

/**
 * High-end template presets for the Canva-style UI.
 */
export const TEMPLATES = [
  {
    id: 'instagram',
    label: 'Instagram Social',
    icon: '📸',
    bgColor: 'from-fuchsia-500 to-pink-500',
    settings: {
      useGradient: true,
      gradient: { type: 'radial', color1: '#fbad50', color2: '#8a3ab9', rotation: 0 },
      fgColor: '#8a3ab9',
      bgColor: '#ffffff',
      dotType: 'classy-rounded',
      cornerSquareType: 'extra-rounded',
      cornerDotType: 'dot',
      errorCorrection: 'Q',
      padding: 10,
    }
  },
  {
    id: 'minimal',
    label: 'Dark Minimal',
    icon: '⚡',
    bgColor: 'from-slate-800 to-slate-900',
    settings: {
      useGradient: false,
      fgColor: '#ffffff',
      bgColor: '#000000',
      dotType: 'square',
      cornerSquareType: 'square',
      cornerDotType: 'square',
      errorCorrection: 'L',
      padding: 20,
    }
  },
  {
    id: 'vibrant',
    label: 'Vibrant Neon',
    icon: '✨',
    bgColor: 'from-cyan-400 to-blue-500',
    settings: {
      useGradient: true,
      gradient: { type: 'linear', color1: '#06b6d4', color2: '#3b82f6', rotation: 45 },
      bgColor: '#ffffff',
      dotType: 'dots',
      cornerSquareType: 'dot',
      cornerDotType: 'dot',
      errorCorrection: 'H',
      padding: 15,
    }
  },
  {
    id: 'corporate',
    label: 'Corporate Pro',
    icon: '💼',
    bgColor: 'from-indigo-600 to-violet-800',
    settings: {
      useGradient: false,
      fgColor: '#1e3a8a',
      bgColor: '#f8fafc',
      dotType: 'rounded',
      cornerSquareType: 'extra-rounded',
      cornerDotType: 'dot',
      errorCorrection: 'M',
      padding: 0,
    }
  }
];

export default function TemplateCarousel({ onApplyTemplate }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-slate-500">
          Design Presets
        </h3>
      </div>
      
      {/* Horizontal Scroll Area */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-2 hide-scrollbar snap-x">
        {TEMPLATES.map((template, idx) => (
          <motion.button
            key={template.id}
            onClick={() => onApplyTemplate(template.settings)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, type: 'spring' }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-none snap-center w-36 h-40 rounded-3xl p-1 bg-gradient-to-br ${template.bgColor} 
                       shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.4)]
                       group relative overflow-hidden transition-all duration-300 outline-none focus:ring-2 focus:ring-white/50`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="w-full h-full bg-slate-900/40 backdrop-blur-sm rounded-[1.35rem] flex flex-col items-center justify-center gap-3 p-4 border border-white/10 relative z-10">
              <span className="text-3xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{template.icon}</span>
              <span className="text-[11px] font-bold text-white text-center leading-tight">
                {template.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
