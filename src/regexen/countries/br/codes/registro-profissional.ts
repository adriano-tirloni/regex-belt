/**
 * Matches a Brazilian professional registration number (CREA, CRO, CRC, COREN, etc.)
 *
 * Format: CR + 1-3 uppercase letters + optional space + 4-10 digits + optional slash or dash + 2 uppercase state letters
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'CREA123456SP'
 * @example ❌ 'crea123456sp'
 */
export const registroProfissional = /^CR[A-Z]{1,3}\s?\d{4,10}[/-]?[A-Z]{2}$/;
