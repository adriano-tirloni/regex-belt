/**
 * Matches a BS2 account format: Agencia XXXX | Conta XXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 123456-7'
 * @example ❌ '1234 1234567-8'
 */
export const bs2 = /^\d{4}\s\d{6}-[\dX]$/;
