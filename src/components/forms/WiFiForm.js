'use client';

import { WIFI_PRESETS } from '@/constants/presets';

/**
 * WiFiForm Component
 * Input form for WiFi credentials with encryption type selection.
 */
export default function WiFiForm({ value, onChange }) {
  const handleFieldChange = (key, fieldValue) => {
    onChange({ ...value, [key]: fieldValue });
  };

  const applyPreset = (preset) => {
    onChange({ ...preset.data });
  };

  return (
    <div className="space-y-4">
      {/* Preset buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider">
          Quick Fill
        </label>
        <div className="flex flex-wrap gap-2">
          {WIFI_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 text-xs bg-cyan-500/10 text-cyan-400
                         border border-cyan-500/20 rounded-lg
                         hover:bg-cyan-500/20 hover:border-cyan-500/30
                         transition-all duration-200"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* SSID */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Network Name (SSID) <span className="text-red-400">*</span>
        </label>
        <input
          id="wifi-ssid"
          type="text"
          value={value.ssid || ''}
          onChange={(e) => handleFieldChange('ssid', e.target.value)}
          placeholder="MyNetwork"
          maxLength={32}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                     text-white placeholder-slate-500
                     focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                     transition-all duration-200"
        />
      </div>

      {/* Password */}
      {value.encryption !== 'nopass' && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Password
          </label>
          <input
            id="wifi-password"
            type="text"
            value={value.password || ''}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                       transition-all duration-200"
          />
        </div>
      )}

      {/* Encryption type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Encryption
        </label>
        <div className="flex gap-2">
          {[
            { value: 'WPA', label: 'WPA/WPA2' },
            { value: 'WEP', label: 'WEP' },
            { value: 'nopass', label: 'None' },
          ].map((enc) => (
            <button
              key={enc.value}
              onClick={() => handleFieldChange('encryption', enc.value)}
              className={`flex-1 px-3 py-2.5 text-sm rounded-xl border transition-all duration-200
                ${value.encryption === enc.value
                  ? 'bg-violet-500/20 border-violet-500/50 text-violet-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
            >
              {enc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hidden network toggle */}
      <label className="flex items-center gap-3 cursor-pointer group" id="wifi-hidden-toggle">
        <div className="relative">
          <input
            type="checkbox"
            checked={value.hidden || false}
            onChange={(e) => handleFieldChange('hidden', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-white/10 rounded-full peer
                          peer-checked:bg-violet-500/50 transition-all duration-300" />
          <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-slate-300 rounded-full
                          peer-checked:translate-x-5 peer-checked:bg-violet-300
                          transition-all duration-300" />
        </div>
        <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
          Hidden Network
        </span>
      </label>
    </div>
  );
}
