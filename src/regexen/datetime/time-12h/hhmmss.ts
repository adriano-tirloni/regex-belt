/**
 * Matches a 12-hour time in HH:MM:SS AM/PM format
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '12:59:59 PM'
 * @example ✅ '01:00:00 AM'
 * @example ❌ '00:00:00 AM'
 * @example ❌ '13:00:00 PM'
 */
export const hhmmss = /^(?:0?[1-9]|1[0-2]):[0-5]\d:[0-5]\d\s?[AaPp][Mm]$/;
