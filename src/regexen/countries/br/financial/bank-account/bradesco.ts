/**
 * Matches a Bradesco account format: Agencia XXXX-D | Conta XXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234-5 1234567-8'
 * @example ❌ '1234-5 12345678-9'
 */
export const bradesco = /^\d{4}-[\dX]\s\d{7}-[\dX]$/;
