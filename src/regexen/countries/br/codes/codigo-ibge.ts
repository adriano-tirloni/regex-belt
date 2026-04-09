/**
 * Matches a Brazilian IBGE municipality code as 7 consecutive digits
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '3550308'
 * @example ❌ '355030'
 */
export const codigoIbge = /^\d{7}$/;
