'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { DEFAULT_QR_OPTIONS } from '@/utils/qrDefaults';

/**
 * useQRCode Hook
 * Manages the QR code instance lifecycle, including creation,
 * updates, and download functionality.
 */
export function useQRCode() {
  const qrCodeRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize QR code instance on mount
  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        ...DEFAULT_QR_OPTIONS,
      });
      setIsReady(true);
    }
  }, []);

  // Append QR code to a DOM container
  const appendTo = useCallback(
    (element) => {
      if (element && qrCodeRef.current && isReady) {
        // Clear any existing content
        element.innerHTML = '';
        qrCodeRef.current.append(element);
        containerRef.current = element;
      }
    },
    [isReady]
  );

  // Update QR code options with debounce for performance
  const update = useCallback((options) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (qrCodeRef.current) {
        qrCodeRef.current.update(options);
      }
    }, 150);
  }, []);

  // Immediate update without debounce (for critical changes)
  const updateImmediate = useCallback((options) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (qrCodeRef.current) {
      qrCodeRef.current.update(options);
    }
  }, []);

  // Download QR code in specified format
  const download = useCallback((extension = 'png', name = 'qr-code') => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({ name, extension });
    }
  }, []);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    appendTo,
    update,
    updateImmediate,
    download,
    isReady,
  };
}
