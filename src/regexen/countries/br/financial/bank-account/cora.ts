/**
 * Matches a Cora account format: Agencia XXXX | Conta XXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 1234567-8'
 * @example ❌ '1234 12345678-9'
 */
export const cora = /^\d{4}\s\d{7}-[\dX]$/;
