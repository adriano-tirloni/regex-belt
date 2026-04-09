/**
 * Matches a Sicredi account format: Agencia XXXX | Conta XXXXXX
 * (no check digit)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 123456'
 * @example ❌ '1234 1234567'
 */
export const sicredi = /^\d{4}\s\d{6}$/;
