/**
 * Matches an ISO-8601 datetime with required timezone
 *
 * Format: YYYY-MM-DDTHH:mm:ss[.mmm](Z|±HH:mm)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '2022-12-31T23:59:59Z'
 * @example ✅ '2022-12-31T23:59:59.999+05:30'
 * @example ✅ '2022-12-31T23:59:59-03:00'
 * @example ❌ '2022-12-31T23:59:59'
 * @example ❌ '2022-12-31'
 */
export const datetimeWithTz =
  /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/;
