/**
 * Matches a Caixa Economica new account format: Agencia XXXX | Conta XXXXXXXXXXXXXX-D
 * (4-digit operation code + 9-digit account + check digit)
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 0013123456789-0'
 * @example ❌ '1234 001312345678-0'
 */
export const caixaEconomicaNew = /^\d{4}\s\d{4}\d{9}-[\dX]$/;
