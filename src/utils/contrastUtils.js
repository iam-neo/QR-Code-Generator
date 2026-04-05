/**
 * Contrast Utilities
 * Ensures QR code colors provide sufficient contrast for readability.
 */

/**
 * Converts a hex color to relative luminance.
 * @param {string} hex - Hex color string (e.g., "#ffffff")
 * @returns {number} Relative luminance value (0-1)
 */
function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts hex color to RGB object.
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number } | null}
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculates the WCAG contrast ratio between two colors.
 * @param {string} color1 - First hex color
 * @param {string} color2 - Second hex color
 * @returns {number} Contrast ratio (1-21)
 */
export function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if two colors have sufficient contrast for QR readability.
 * QR codes need at least a 3:1 contrast ratio for reliable scanning.
 * @param {string} fg - Foreground hex color
 * @param {string} bg - Background hex color
 * @returns {{ ok: boolean, ratio: number, message: string }}
 */
export function checkQRContrast(fg, bg) {
  const ratio = getContrastRatio(fg, bg);
  if (ratio >= 4.5) {
    return { ok: true, ratio, message: 'Excellent contrast' };
  } else if (ratio >= 3) {
    return { ok: true, ratio, message: 'Acceptable contrast — may be difficult for some scanners' };
  } else {
    return { ok: false, ratio, message: 'Poor contrast — QR code may not scan reliably' };
  }
}
