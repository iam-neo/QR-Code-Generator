'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQRCode } from '@/hooks/useQRCode';
import { useTheme } from '@/hooks/useTheme';
import { formatVCard, formatWiFi, formatUrl } from '@/utils/formatters';
import { DEFAULT_QR_OPTIONS } from '@/utils/qrDefaults';

/* Components */
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
import PaddingControl from './customization/PaddingControl';
import QRPreview from './QRPreview';
import TemplateCarousel from './TemplateCarousel';
import ThemeToggle from './ThemeToggle';

const INITIAL_STATE = {
  dataType: 'url',
  textData: '',
  urlData: '',
  vcardData: { firstName: '', lastName: '', phone: '', email: '', organization: '', title: '', website: '', address: '' },
  wifiData: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  fgColor: '#1e1b4b',
  bgColor: '#ffffff',
  useGradient: false,
  gradient: { type: 'linear', color1: '#7c3aed', color2: '#06b6d4', rotation: 135 },
  dotType: 'rounded',
  cornerSquareType: 'extra-rounded',
  cornerDotType: 'dot',
  size: 300,
  errorCorrection: 'M',
  logo: null,
  padding: 0,
};

export default function QRApp() {
  const [state, setState] = useState(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState('data'); // Sidebar tabs: data, design, logo
  const { appendTo, update, download, isReady } = useQRCode();
  const { theme, toggleTheme, mounted } = useTheme();

  const getQRData = useCallback(() => {
    switch (state.dataType) {
      case 'text': return state.textData || 'Hello World';
      case 'url': return state.urlData ? formatUrl(state.urlData) : 'https://example.com';
      case 'vcard': return formatVCard(state.vcardData);
      case 'wifi': return formatWiFi(state.wifiData);
      default: return 'https://example.com';
    }
  }, [state.dataType, state.textData, state.urlData, state.vcardData, state.wifiData]);

  const buildQROptions = useCallback(() => {
    const hasLogo = !!state.logo;
    const ecLevel = hasLogo ? 'H' : state.errorCorrection;

    const dotsOptions = { type: state.dotType };
    if (state.useGradient) {
      dotsOptions.gradient = {
        type: state.gradient.type,
        rotation: state.gradient.rotation * (Math.PI / 180),
        colorStops: [{ offset: 0, color: state.gradient.color1 }, { offset: 1, color: state.gradient.color2 }],
      };
    } else {
      dotsOptions.color = state.fgColor;
    }

    return {
      data: getQRData(),
      width: state.size,
      height: state.size,
      margin: state.padding,
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
      backgroundOptions: { color: state.bgColor },
      qrOptions: { errorCorrectionLevel: ecLevel },
      imageOptions: { ...DEFAULT_QR_OPTIONS.imageOptions, imageSize: 0.3, margin: 5 },
    };
  }, [state, getQRData]);

  const qrDataHash = useMemo(() => JSON.stringify(buildQROptions()), [buildQROptions]);

  useEffect(() => {
    if (isReady) update(buildQROptions());
  }, [isReady, buildQROptions, update]);

  useEffect(() => {
    if (state.logo && state.errorCorrection !== 'H') {
      setState((prev) => ({ ...prev, errorCorrection: 'H' }));
    }
  }, [state.logo, state.errorCorrection]);

  const set = (key) => (value) => setState((prev) => ({ ...prev, [key]: value }));
  
  const handleApplyTemplate = (settings) => {
    setState(prev => ({ ...prev, ...settings }));
    setActiveTab('design');
  };

  const [activeDownloadFormat, setActiveDownloadFormat] = useState('png');
  const handleDownload = () => download(activeDownloadFormat, `qr-studio-${state.dataType}-${Date.now()}`);

  if (!mounted) return null;

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50 dark:bg-[#05050A] text-slate-900 dark:text-slate-50 selection:bg-violet-500/30">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-16 flex-none border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-[#080810]/70 backdrop-blur-xl z-50 flex items-center justify-between px-4 sm:px-6 relative shadow-sm">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-white dark:bg-[#05050A] rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
          </div>
          <h1 className="font-heading text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            QR Studio
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          
          <div className="h-6 w-px bg-slate-300 dark:bg-white/10" />
          
          <div className="flex items-center gap-2">
            <select
              value={activeDownloadFormat}
              onChange={(e) => setActiveDownloadFormat(e.target.value)}
              className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-bold px-3 py-1.5 outline-none focus:ring-2 focus:ring-violet-500/50 appearance-none cursor-pointer"
            >
              <option value="png">PNG HD</option>
              <option value="svg">SVG Vector</option>
              <option value="jpeg">JPEG Fast</option>
            </select>
            <button 
              onClick={handleDownload}
              className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-violet-500/25 active:scale-95 transition-all"
            >
              Export
            </button>
          </div>
        </div>
      </header>

      {/* 2. SPLIT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Designer Sidebar (Left) */}
        <aside className="w-full max-w-[400px] flex-none border-r border-slate-200 dark:border-white/5 bg-white/40 dark:bg-[#0A0A10]/40 backdrop-blur-2xl flex flex-col z-20 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.1)]">
          
          {/* Internal Sidebar Tabs */}
          <div className="flex p-3 gap-2 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20">
            {[
              { id: 'data', label: 'Data Input', icon: '📝' },
              { id: 'design', label: 'Aesthetics', icon: '🎨' },
              { id: 'logo', label: 'Branding', icon: '✨' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 py-2 px-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                  activeTab === t.id 
                  ? 'bg-white dark:bg-white/10 text-violet-600 dark:text-violet-400 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span className="mr-1.5">{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: DATA */}
              {activeTab === 'data' && (
                <motion.div key="data" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div>
                    <h2 className="font-heading text-lg font-bold mb-4">What's your QR for?</h2>
                    <DataTypeSelector value={state.dataType} onChange={set('dataType')} />
                  </div>
                  <div className="p-5 bg-white dark:bg-[#111116] rounded-2xl border border-slate-100 dark:border-white/5 shadow-inner">
                    {state.dataType === 'text' && <TextForm value={state.textData} onChange={set('textData')} />}
                    {state.dataType === 'url' && <UrlForm value={state.urlData} onChange={set('urlData')} />}
                    {state.dataType === 'vcard' && <VCardForm value={state.vcardData} onChange={set('vcardData')} />}
                    {state.dataType === 'wifi' && <WiFiForm value={state.wifiData} onChange={set('wifiData')} />}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: DESIGN / AESTHETICS */}
              {activeTab === 'design' && (
                <motion.div key="design" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-bold border-b border-slate-200 dark:border-white/10 pb-2">Colors & Paint</h3>
                    <ColorPicker
                      fgColor={state.fgColor} bgColor={state.bgColor}
                      onFgChange={set('fgColor')} onBgChange={set('bgColor')}
                      useGradient={state.useGradient}
                      onToggleGradient={() => setState((p) => ({ ...p, useGradient: !p.useGradient }))}
                    />
                    {state.useGradient && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pt-2">
                        <GradientPicker gradient={state.gradient} onChange={set('gradient')} />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-bold border-b border-slate-200 dark:border-white/10 pb-2">Pattern & Layout</h3>
                    <DotStyleSelector
                      dotType={state.dotType}
                      cornerSquareType={state.cornerSquareType}
                      cornerDotType={state.cornerDotType}
                      onDotChange={set('dotType')}
                      onCornerSquareChange={set('cornerSquareType')}
                      onCornerDotChange={set('cornerDotType')}
                    />
                  </div>

                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-bold border-b border-slate-200 dark:border-white/10 pb-2">Sizing & Spacing</h3>
                    <div className="space-y-8 bg-white dark:bg-[#111116] p-5 rounded-2xl border border-slate-100 dark:border-white/5">
                      <SizeControl size={state.size} onChange={set('size')} />
                      <PaddingControl value={state.padding} onChange={set('padding')} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: BRANDING / LOGO */}
              {activeTab === 'logo' && (
                <motion.div key="logo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-bold border-b border-slate-200 dark:border-white/10 pb-2">Centerpiece Branding</h3>
                    <LogoUploader
                      logo={state.logo}
                      onLogoChange={set('logo')}
                      onLogoRemove={() => setState((p) => ({ ...p, logo: null }))}
                    />
                    <div className="text-xs text-slate-500 bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 leading-relaxed">
                      💡 Uploading a logo will automatically set Error Correction to Maximum (30% redundancy) to ensure your QR code remains highly scannable.
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="font-heading text-lg font-bold border-b border-slate-200 dark:border-white/10 pb-2">Redundancy Settings</h3>
                    <ErrorCorrectionSelector
                      value={state.logo ? 'H' : state.errorCorrection}
                      onChange={set('errorCorrection')}
                      hasLogo={!!state.logo}
                    />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </aside>

        {/* Main Central Canvas (Right) */}
        <main className="flex-1 relative flex flex-col z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200/50 via-slate-50 to-white dark:from-[#1A1A24] dark:via-[#09090E] dark:to-[#05050A]">
          {/* Canvas Dot Pattern Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
            {/* The Spectacular QR Preview */}
            <QRPreview appendTo={appendTo} isReady={isReady} qrDataHash={qrDataHash} />
            
            {/* Metadata Badges Below QR */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                {state.size} × {state.size} px
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                {activeDownloadFormat} Format
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 backdrop-blur-md rounded-lg border border-emerald-200 dark:border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Optimized for Scanning
              </div>
            </motion.div>
          </div>

          {/* Bottom Template Carousel Area */}
          <div className="h-[220px] w-full flex-none bg-white/30 dark:bg-black/30 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/5 relative z-20 py-4 px-6 flex items-center shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
             <TemplateCarousel onApplyTemplate={handleApplyTemplate} />
          </div>

        </main>
      </div>
    </div>
  );
}
