/**
 * Matches any integer including zero (no leading zeros except for zero itself)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '0'
 * @example ✅ '123'
 * @example ✅ '-456'
 * @example ❌ '01'
 * @example ❌ '1.5'
 */
export const any = /^(?:0|-?[1-9]\d*)$/;
