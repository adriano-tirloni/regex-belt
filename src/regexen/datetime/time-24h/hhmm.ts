/**
 * Matches a 24-hour time in HH:MM format
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '23:59'
 * @example ✅ '00:00'
 * @example ❌ '24:00'
 * @example ❌ '23:59:59'
 */
export const hhmm = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
