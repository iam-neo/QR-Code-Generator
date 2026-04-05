'use client';

import { VCARD_PRESETS } from '@/constants/presets';

/**
 * VCardForm Component
 * Multi-field form for creating vCard QR codes.
 */

const FIELDS = [
  { key: 'firstName', label: 'First Name', placeholder: 'John', required: true },
  { key: 'lastName', label: 'Last Name', placeholder: 'Doe', required: true },
  { key: 'phone', label: 'Phone', placeholder: '+1-555-123-4567', type: 'tel' },
  { key: 'email', label: 'Email', placeholder: 'john@example.com', type: 'email' },
  { key: 'organization', label: 'Organization', placeholder: 'Acme Corp' },
  { key: 'title', label: 'Job Title', placeholder: 'Senior Developer' },
  { key: 'website', label: 'Website', placeholder: 'https://example.com', type: 'url' },
  { key: 'address', label: 'Address', placeholder: '123 Main St, City, State' },
];

export default function VCardForm({ value, onChange }) {
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
          {VCARD_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 text-xs bg-violet-500/10 text-violet-400
                         border border-violet-500/20 rounded-lg
                         hover:bg-violet-500/20 hover:border-violet-500/30
                         transition-all duration-200"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIELDS.map((field) => (
          <div key={field.key} className={field.key === 'address' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              {field.label}
              {field.required && <span className="text-red-400 ml-0.5">*</span>}
            </label>
            <input
              id={`vcard-${field.key}`}
              type={field.type || 'text'}
              value={value[field.key] || ''}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl
                         text-white text-sm placeholder-slate-500
                         focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                         transition-all duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
