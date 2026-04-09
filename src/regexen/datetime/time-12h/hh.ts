/**
 * Matches a 12-hour hour in HH format without meridiem
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12'
 * @example ✅ '1'
 * @example ❌ '0'
 * @example ❌ '12 PM'
 */
export const hh = /^(?:0?[1-9]|1[0-2])$/;
