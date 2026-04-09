/**
 * Regex that matches a UTC ISO String Date in format YYYY-MM-DDTHH:mm:ss.sssZ
 * @example ✅ 2022-12-31T23:59:59.999Z
 * @example ✅ 2022-12-31T23:59:59Z
 */
export const isoUtc = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
