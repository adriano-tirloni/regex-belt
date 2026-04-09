/**
 * Matches a PJBank account format: Agencia XXXX | Conta XXXXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 1234567890-1'
 * @example ❌ '1234 123456789-0'
 */
export const pjbank = /^\d{4}\s\d{10}-[\dX]$/;
