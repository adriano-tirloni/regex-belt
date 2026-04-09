/**
 * Matches a ViaCredi account format: Agencia XXXX | Conta XXXXXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 12345678901-2'
 * @example ❌ '1234 1234567890-2'
 */
export const viaCredi = /^\d{4}\s\d{11}-[\dX]$/;
