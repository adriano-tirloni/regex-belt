/** Valid NFe access keys (44 digits) */
export const validChaveNfe = {
  /** Standard 44-digit NFe key */
  standard: '35210612345678000195550010001234561123456784',
  /** All zeros — structurally valid */
  allZeros: '00000000000000000000000000000000000000000000',
  /** All nines — maximum digit values */
  allNines: '99999999999999999999999999999999999999999999',
};

/** Invalid NFe key strings */
export const invalidChaveNfe = {
  /** Too short — 43 digits */
  tooShort: '3521061234567800019555001000123456112345678',
  /** Too long — 45 digits */
  tooLong: '352106123456780001955500100012345611234567841',
  /** Alphabetic characters */
  alphabetic: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqr',
  /** Digits with spaces */
  withSpaces: '3521 0612 3456 7800 0195 5500 1000 1234 5611',
};
