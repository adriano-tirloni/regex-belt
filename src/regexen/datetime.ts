/**
 * Regex that matches a UTC ISO String Date in format YYYY-MM-DDTHH:mm:ss.sssZ
 * @example 2022-12-31T23:59:59.999Z (with milliseconds)
 * @example 2022-12-31T23:59:59Z (without milliseconds)
 */
export const UTC_ISOString = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

/**
 * Matches a date in the format YYYY-MM-DD
 * Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day.
 *
 * ___Enforces beginning and end of string___
 * @example '2022-12-31' (matches)
 * @example '2022-12-31T23:59:59.999Z' (does not match)
 * @example '9992022-12-31' (does not match)
 */
export const dashed_YYYYMMDD = /^([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))$/;

/**
 * Matches a date in the format YYYY-MM-DD
 * Valid digits are 0000 to 9999 for year, 01 to 12 for month and 01 to 31 for day
 *
 * ___Does not enforce beginning and end of string___
 * @example '2022-12-31' (matches)
 * @example '2022-12-31T23:59:59.999Z' (matches)
 * @example '9992022-12-31' (matches)
 */
export const dashed_YYYYMMDD_Loose =
  /([0-9]{4}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1]))/;
