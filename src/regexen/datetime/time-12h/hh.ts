/**
 * Matches a 12-hour hour in HH AM/PM format
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12 PM'
 * @example ✅ '1 AM'
 * @example ❌ '0 AM'
 * @example ❌ '13 PM'
 */
export const hh = /^(?:0?[1-9]|1[0-2])\s?[AaPp][Mm]$/;
