/**
 * Matches a Mercado Pago account format: Agencia XXXX | Conta XXXXXXXXXXXXX-D
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '1234 1234567890123-4'
 * @example ❌ '1234 123456789012-4'
 */
export const mercadoPago = /^\d{4}\s\d{13}-[\dX]$/;
