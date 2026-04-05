/**
 * QR Code Default Options
 * Provides default configuration for qr-code-styling.
 */

export const DEFAULT_QR_OPTIONS = {
  width: 300,
  height: 300,
  type: 'canvas',
  data: 'https://example.com',
  margin: 10,
  qrOptions: {
    errorCorrectionLevel: 'M',
  },
  dotsOptions: {
    color: '#1e1b4b',
    type: 'rounded',
  },
  cornersSquareOptions: {
    color: '#1e1b4b',
    type: 'extra-rounded',
  },
  cornersDotOptions: {
    color: '#7c3aed',
    type: 'dot',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.3,
    margin: 8,
    crossOrigin: 'anonymous',
  },
};

export const DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
];

export const CORNER_SQUARE_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'extra-rounded', label: 'Rounded' },
  { value: 'dot', label: 'Dot' },
];

export const CORNER_DOT_STYLES = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Dot' },
];

export const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'L', description: '7% recovery' },
  { value: 'M', label: 'M', description: '15% recovery' },
  { value: 'Q', label: 'Q', description: '25% recovery' },
  { value: 'H', label: 'H', description: '30% recovery' },
];

export const DATA_TYPES = [
  { value: 'text', label: 'Text', icon: '✏️' },
  { value: 'url', label: 'URL', icon: '🔗' },
  { value: 'vcard', label: 'Contact', icon: '👤' },
  { value: 'wifi', label: 'WiFi', icon: '📶' },
];
