/**
 * QR Data Formatters
 * Converts structured form data into QR-compatible string formats.
 */

/**
 * Formats contact fields into a vCard 3.0 string.
 * @param {Object} fields - Contact fields
 * @returns {string} vCard formatted string
 */
export function formatVCard(fields) {
  const {
    firstName = '',
    lastName = '',
    phone = '',
    email = '',
    organization = '',
    title = '',
    website = '',
    address = '',
  } = fields;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${firstName} ${lastName}`.trim(),
  ];

  if (organization) lines.push(`ORG:${organization}`);
  if (title) lines.push(`TITLE:${title}`);
  if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
  if (email) lines.push(`EMAIL:${email}`);
  if (website) lines.push(`URL:${website}`);
  if (address) lines.push(`ADR;TYPE=HOME:;;${address};;;;`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Formats WiFi credentials into a WiFi QR string.
 * Format: WIFI:T:<encryption>;S:<ssid>;P:<password>;H:<hidden>;;
 * @param {Object} params - WiFi parameters
 * @returns {string} WiFi formatted string
 */
export function formatWiFi({ ssid = '', password = '', encryption = 'WPA', hidden = false }) {
  // Escape special characters in SSID and password
  const escapeField = (str) => str.replace(/([\\;,:"'])/g, '\\$1');

  const parts = [`WIFI:T:${encryption}`];
  parts.push(`S:${escapeField(ssid)}`);

  if (encryption !== 'nopass' && password) {
    parts.push(`P:${escapeField(password)}`);
  }

  if (hidden) {
    parts.push('H:true');
  }

  return parts.join(';') + ';;';
}

/**
 * Formats a URL, auto-prepending https:// if missing.
 * @param {string} url - Raw URL string
 * @returns {string} Properly formatted URL
 */
export function formatUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}
