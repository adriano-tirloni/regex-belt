/**
 * Matches a 12-hour time in HH:MM format without meridiem
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12:59'
 * @example ✅ '01:00'
 * @example ❌ '00:00'
 * @example ❌ '12:59 PM'
 */
export const hhmm = /^(?:0?[1-9]|1[0-2]):[0-5]\d$/;
