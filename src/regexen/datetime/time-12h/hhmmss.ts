/**
 * Matches a 12-hour time in HH:MM:SS format without meridiem
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12:59:59'
 * @example ✅ '01:00:00'
 * @example ❌ '00:00:00'
 * @example ❌ '12:59:59 PM'
 */
export const hhmmss = /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d$/;
