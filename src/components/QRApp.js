'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQRCode } from '@/hooks/useQRCode';
import { useTheme } from '@/hooks/useTheme';
import { formatVCard, formatWiFi, formatUrl } from '@/utils/formatters';
import { DEFAULT_QR_OPTIONS } from '@/utils/qrDefaults';

import DataTypeSelector from './DataTypeSelector';
import TextForm from './forms/TextForm';
import UrlForm from './forms/UrlForm';
import VCardForm from './forms/VCardForm';
import WiFiForm from './forms/WiFiForm';
import ColorPicker from './customization/ColorPicker';
import GradientPicker from './customization/GradientPicker';
import DotStyleSelector from './customization/DotStyleSelector';
import SizeControl from './customization/SizeControl';
import ErrorCorrectionSelector from './customization/ErrorCorrectionSelector';
import LogoUploader from './customization/LogoUploader';
import QRPreview from './QRPreview';
import DownloadPanel from './DownloadPanel';
import ThemeToggle from './ThemeToggle';
import ResetButton from './ResetButton';

/**
 * Initial state for all QR settings
 */
const INITIAL_STATE = {
  dataType: 'url',
  // Data per type
  textData: '',
  urlData: '',
  vcardData: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    title: '',
    website: '',
    address: '',
  },
  wifiData: {
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  // Customization
  fgColor: '#1e1b4b',
  bgColor: '#ffffff',
  useGradient: false,
  gradient: {
    type: 'linear',
    color1: '#7c3aed',
    color2: '#06b6d4',
    rotation: 135,
  },
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  size: 300,
  errorCorrection: 'M',
  logo: null,
};

/**
 * QRApp Component
 * Main orchestrator that manages all QR state and renders
 * the three-panel layout: Input | Customization | Preview.
 */
export default function QRApp() {
  const [state, setState] = useState(INITIAL_STATE);
  const { appendTo, update, download, isReady } = useQRCode();
  const { theme, toggleTheme, mounted } = useTheme();

  // Compute the QR data string based on the selected data type
  const getQRData = useCallback(() => {
    switch (state.dataType) {
      case 'text':
        return state.textData || 'Hello World';
      case 'url':
        return state.urlData ? formatUrl(state.urlData) : 'https://example.com';
      case 'vcard':
        return formatVCard(state.vcardData);
      case 'wifi':
        return formatWiFi(state.wifiData);
      default:
        return 'https://example.com';
    }
  }, [state.dataType, state.textData, state.urlData, state.vcardData, state.wifiData]);

  // Build QR options from current state
  const buildQROptions = useCallback(() => {
    const hasLogo = !!state.logo;
    const ecLevel = hasLogo ? 'H' : state.errorCorrection;

    const dotsOptions = { type: state.dotType };
    if (state.useGradient) {
      dotsOptions.gradient = {
        type: state.gradient.type,
        rotation: state.gradient.rotation * (Math.PI / 180),
        colorStops: [
          { offset: 0, color: state.gradient.color1 },
          { offset: 1, color: state.gradient.color2 },
        ],
      };
    } else {
      dotsOptions.color = state.fgColor;
    }

    return {
      data: getQRData(),
      width: state.size,
      height: state.size,
      image: state.logo || undefined,
      dotsOptions,
      cornersSquareOptions: {
        type: state.cornerSquareType,
        color: state.useGradient ? state.gradient.color1 : state.fgColor,
      },
      cornersDotOptions: {
        type: state.cornerDotType,
        color: state.useGradient ? state.gradient.color2 : state.fgColor,
      },
      backgroundOptions: {
        color: state.bgColor,
      },
      qrOptions: {
        errorCorrectionLevel: ecLevel,
      },
      imageOptions: {
        ...DEFAULT_QR_OPTIONS.imageOptions,
        imageSize: 0.3,
      },
    };
  }, [state, getQRData]);

  // Update QR code whenever state changes
  useEffect(() => {
    if (isReady) {
      update(buildQROptions());
    }
  }, [isReady, buildQROptions, update]);

  // Auto-set error correction to H when logo is added
  useEffect(() => {
    if (state.logo && state.errorCorrection !== 'H') {
      setState((prev) => ({ ...prev, errorCorrection: 'H' }));
    }
  }, [state.logo, state.errorCorrection]);

  // State updater helper
  const set = (key) => (value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // Reset all settings
  const handleReset = () => {
    setState(INITIAL_STATE);
  };

  // Handle download
  const handleDownload = (ext) => {
    const typeLabel = state.dataType;
    download(ext, `qr-${typeLabel}-${Date.now()}`);
  };

  // Don't render until theme is mounted (prevents flash)
  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${theme === 'dark'
        ? 'bg-slate-950 text-white'
        : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl
          ${theme === 'dark' ? 'bg-violet-600/8' : 'bg-violet-300/20'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl
          ${theme === 'dark' ? 'bg-cyan-600/8' : 'bg-cyan-300/15'}`} />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600
                            flex items-center justify-center shadow-lg shadow-violet-500/25">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h1 className={`text-lg font-bold tracking-tight
                ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                QR Studio
              </h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                Beautiful QR codes, instantly
              </p>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Panel — Input */}
          <div className="lg:col-span-4 space-y-5">
            <Card theme={theme} title="Data Input">
              <DataTypeSelector
                value={state.dataType}
                onChange={set('dataType')}
              />
              <div className="mt-4">
                {state.dataType === 'text' && (
                  <TextForm value={state.textData} onChange={set('textData')} />
                )}
                {state.dataType === 'url' && (
                  <UrlForm value={state.urlData} onChange={set('urlData')} />
                )}
                {state.dataType === 'vcard' && (
                  <VCardForm value={state.vcardData} onChange={set('vcardData')} />
                )}
                {state.dataType === 'wifi' && (
                  <WiFiForm value={state.wifiData} onChange={set('wifiData')} />
                )}
              </div>
            </Card>
          </div>

          {/* Center Panel — Customization */}
          <div className="lg:col-span-4 space-y-5">
            <Card theme={theme} title="Customize">
              <div className="space-y-6">
                <ColorPicker
                  fgColor={state.fgColor}
                  bgColor={state.bgColor}
                  onFgChange={set('fgColor')}
                  onBgChange={set('bgColor')}
                  useGradient={state.useGradient}
                  onToggleGradient={() => setState((p) => ({ ...p, useGradient: !p.useGradient }))}
                />

                {state.useGradient && (
                  <GradientPicker
                    gradient={state.gradient}
                    onChange={set('gradient')}
                  />
                )}

                <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`} />

                <DotStyleSelector
                  dotType={state.dotType}
                  cornerSquareType={state.cornerSquareType}
                  cornerDotType={state.cornerDotType}
                  onDotChange={set('dotType')}
                  onCornerSquareChange={set('cornerSquareType')}
                  onCornerDotChange={set('cornerDotType')}
                />

                <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`} />

                <SizeControl size={state.size} onChange={set('size')} />

                <ErrorCorrectionSelector
                  value={state.logo ? 'H' : state.errorCorrection}
                  onChange={set('errorCorrection')}
                  hasLogo={!!state.logo}
                />

                <div className={`border-t ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`} />

                <LogoUploader
                  logo={state.logo}
                  onLogoChange={set('logo')}
                  onLogoRemove={() => setState((p) => ({ ...p, logo: null }))}
                />
              </div>
            </Card>
          </div>

          {/* Right Panel — Preview & Download */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-6 space-y-5">
              <Card theme={theme} title="Preview">
                <QRPreview appendTo={appendTo} isReady={isReady} />
              </Card>

              <Card theme={theme}>
                <DownloadPanel onDownload={handleDownload} />
              </Card>

              <Card theme={theme}>
                <ResetButton onReset={handleReset} />
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className={`text-xs ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>
            QR Studio — Generate beautiful QR codes instantly. No data is sent to any server.
          </p>
        </div>
      </footer>
    </div>
  );
}

/**
 * Card Component
 * Reusable glassmorphism card wrapper.
 */
function Card({ children, theme, title }) {
  return (
    <div className={`rounded-2xl border p-5 transition-colors duration-300
      ${theme === 'dark'
        ? 'bg-white/[0.03] border-white/[0.06] backdrop-blur-sm'
        : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {title && (
        <h2 className={`text-sm font-semibold uppercase tracking-wider mb-4
          ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
