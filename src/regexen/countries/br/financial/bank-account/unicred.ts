/**
 * Matches a Unicred account format: Agencia XXXX | Conta XXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 12345678-9'
 * @example ❌ '1234 1234567-9'
 */
export const unicred = /^\d{4}\s\d{8}-[\dX]$/;
