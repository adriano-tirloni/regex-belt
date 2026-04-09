/**
 * Matches a 12-hour time in HH:MM AM/PM format
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12:59 PM'
 * @example ✅ '01:00 AM'
 * @example ❌ '00:00 AM'
 * @example ❌ '13:00 PM'
 */
export const hhmm = /^(?:0?[1-9]|1[0-2]):[0-5]\d\s?[AaPp][Mm]$/;
