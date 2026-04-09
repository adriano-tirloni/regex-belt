/**
 * Matches a Caixa Economica account format: Agencia XXXX | Conta XXXXXXXXXXX-D
 * (3-digit operation code + 8-digit account + check digit)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 00112345678-9'
 * @example ❌ '1234 0012345678-9'
 */
export const caixaEconomica = /^\d{4}\s\d{3}\d{8}-[\dX]$/;
