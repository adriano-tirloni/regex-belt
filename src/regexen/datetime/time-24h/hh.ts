/**
 * Matches a 24-hour hour in HH format
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '23'
 * @example ✅ '00'
 * @example ❌ '24'
 * @example ❌ '5'
 */
export const hh = /^(?:[01]\d|2[0-3])$/;
