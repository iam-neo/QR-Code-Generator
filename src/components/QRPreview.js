'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * Dribbble-level QRPreview Component
 * Massive centered QR code inside a floating glass card with an intense energy aura.
 */
export default function QRPreview({ appendTo, isReady, qrDataHash }) {
  const containerRef = useRef(null);
  const hasAppended = useRef(false);
  const controls = useAnimation();

  // Mount the QR canvas
  useEffect(() => {
    if (containerRef.current && isReady && !hasAppended.current) {
      appendTo(containerRef.current);
      hasAppended.current = true;
    }
  }, [appendTo, isReady]);

  // Spring bounce trigger on data change
  useEffect(() => {
    if (isReady && hasAppended.current) {
      controls.start({
        scale: [1, 1.03, 1],
        transition: { type: 'keyframes', duration: 0.4, ease: 'easeOut' }
      });
    }
  }, [qrDataHash, controls, isReady]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[500px] aspect-square mx-auto animate-float">
      {/* Background Energy Aura */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] bg-gradient-to-tr from-violet-600/50 via-fuchsia-600/40 to-cyan-500/40 rounded-full blur-[80px] mix-blend-screen pointer-events-none" 
      />
      
      {/* Concentrated Under-Glow Drop Shadow */}
      <div className="absolute -bottom-8 inset-x-0 mx-auto w-[70%] h-16 bg-violet-900/50 blur-3xl rounded-full pointer-events-none" />

      {/* Floating Glass Container */}
      <motion.div 
        animate={controls}
        className="relative z-10 p-2 sm:p-3 rounded-[3rem] bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        {/* Actual Canvas Wrapper */}
        <div className="relative bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-inner overflow-hidden">
          <div
            ref={containerRef}
            id="qr-preview-container"
            className="flex items-center justify-center [&>canvas]:rounded-xl [&>svg]:rounded-xl"
          />
        </div>
      </motion.div>
    </div>
  );
}
