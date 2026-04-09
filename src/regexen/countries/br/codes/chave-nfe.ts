/**
 * Matches a Brazilian NFe (Nota Fiscal Eletronica) access key as 44 consecutive digits
 *
 * ___Enforces beginning and end of string___
 * @example ✅ '35210612345678000195550010001234561123456784'
 * @example ❌ '3521061234567800019555001000123456112345678'
 */
export const chaveNfe = /^\d{44}$/;
