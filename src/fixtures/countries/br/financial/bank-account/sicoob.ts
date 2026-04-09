/** Valid Sicoob account formats (XXXX XXXXXXXXX-D) */
export const validSicoob = {
  /** Standard account with numeric check digit */
  standard: '1234 123456789-0',
  /** Account with X check digit */
  checkDigitX: '0001 000000001-X',
  /** All nines */
  allNines: '9999 999999999-9',
};

/** Invalid Sicoob account strings */
export const invalidSicoob = {
  /** Account number too short (8 digits) */
  shortAccount: '1234 12345678-0',
  /** Agency too long (5 digits) */
  longAgency: '12345 123456789-0',
  /** Missing space separator */
  noSpace: '1234123456789-0',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklm-n',
};
