'use client';

import { useEffect, useRef } from 'react';

/**
 * QRPreview Component
 * Renders the live QR code preview using qr-code-styling.
 */
export default function QRPreview({ appendTo, isReady }) {
  const containerRef = useRef(null);
  const hasAppended = useRef(false);

  useEffect(() => {
    if (containerRef.current && isReady && !hasAppended.current) {
      appendTo(containerRef.current);
      hasAppended.current = true;
    }
  }, [appendTo, isReady]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative group">
        {/* Glow effect behind QR */}
        <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-cyan-600/20
                        rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* QR Container */}
        <div className="relative bg-white rounded-2xl p-4 shadow-2xl shadow-black/20">
          <div
            ref={containerRef}
            id="qr-preview-container"
            className="flex items-center justify-center [&>canvas]:rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
