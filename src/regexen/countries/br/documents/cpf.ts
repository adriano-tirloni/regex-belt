/**
 * Matches a Brazilian CPF number in the format XXX.XXX.XXX-XX
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '123.456.789-09'
 * @example ❌ '12345678909'
 */
export const cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
