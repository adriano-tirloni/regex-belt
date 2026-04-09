/**
 * Matches a Sicoob account format: Agencia XXXX | Conta XXXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 123456789-0'
 * @example ❌ '1234 12345678-0'
 */
export const sicoob = /^\d{4}\s\d{9}-[\dX]$/;
