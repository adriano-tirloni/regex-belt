/**
 * Matches a negative integer (less than zero, no leading zeros)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '-1'
 * @example ✅ '-123'
 * @example ❌ '0'
 * @example ❌ '1'
 * @example ❌ '-01'
 */
export const negative = /^-[1-9]\d*$/;
