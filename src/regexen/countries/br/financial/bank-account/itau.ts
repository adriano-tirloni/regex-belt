/**
 * Matches an Itau account format: Agencia XXXX | Conta XXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 12345-6'
 * @example ❌ '1234 123456-7'
 */
export const itau = /^\d{4}\s\d{5}-[\dX]$/;
