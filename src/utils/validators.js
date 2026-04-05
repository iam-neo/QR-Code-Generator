/**
 * Input Validators
 * Provides validation functions for QR data inputs.
 */

/**
 * Validates a URL string.
 * @param {string} str - URL to validate
 * @returns {boolean}
 */
export function isValidUrl(str) {
  if (!str) return false;
  try {
    const url = new URL(str.startsWith('http') ? str : `https://${str}`);
    return url.hostname.includes('.');
  } catch {
    return false;
  }
}

/**
 * Validates an email address.
 * @param {string} str - Email to validate
 * @returns {boolean}
 */
export function isValidEmail(str) {
  if (!str) return true; // Optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

/**
 * Validates a phone number (basic international format).
 * @param {string} str - Phone to validate
 * @returns {boolean}
 */
export function isValidPhone(str) {
  if (!str) return true; // Optional field
  return /^[+]?[\d\s\-().]{7,20}$/.test(str);
}

/**
 * Validates WiFi SSID (non-empty).
 * @param {string} ssid
 * @returns {boolean}
 */
export function isValidSSID(ssid) {
  return ssid && ssid.trim().length > 0 && ssid.trim().length <= 32;
}
