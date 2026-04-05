'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * LogoUploader Component
 * Drag-and-drop logo upload with preview and validation.
 */
export default function LogoUploader({ logo, onLogoChange, onLogoRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

  const processFile = useCallback((file) => {
    setError('');

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload PNG, JPG, SVG, or WebP');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File must be under 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onLogoChange(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [onLogoChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        Logo
      </label>

      {logo ? (
        /* Logo preview */
        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0
                          flex items-center justify-center p-1">
            <img
              src={logo}
              alt="Logo preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-300">Logo uploaded</p>
            <p className="text-xs text-slate-500">Error correction set to High</p>
          </div>
          <button
            onClick={onLogoRemove}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10
                       rounded-lg transition-all duration-200"
            title="Remove logo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ) : (
        /* Upload dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-2 p-6
                     border-2 border-dashed rounded-xl cursor-pointer
                     transition-all duration-200
                     ${isDragging
                       ? 'border-violet-500 bg-violet-500/10'
                       : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5'
                     }`}
        >
          <div className={`p-2.5 rounded-full transition-colors duration-200
            ${isDragging ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-slate-500'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-400">
              {isDragging ? 'Drop your logo here' : 'Drag & drop logo'}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              PNG, JPG, SVG — max 2MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/svg+xml, image/webp"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
