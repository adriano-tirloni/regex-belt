/**
 * Matches a Banco do Brasil account format: Agencia XXXX-D | Conta XXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234-5 12345678-9'
 * @example ❌ '1234-5 1234567-9'
 */
export const bancoDoBrasil = /^\d{4}-[\dX]\s\d{8}-[\dX]$/;
