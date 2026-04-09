/**
 * Matches a negative decimal number (no leading zeros except before the dot)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '-1.5'
 * @example ✅ '-0.123'
 * @example ❌ '1.5'
 * @example ❌ '-1'
 */
export const negative = /^-(?:0|[1-9]\d*)\.\d+$/;
