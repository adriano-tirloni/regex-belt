/** Valid PJBank account formats (XXXX XXXXXXXXXX-D) */
export const validPjbank = {
  /** Standard account with numeric check digit */
  standard: '1234 1234567890-1',
  /** Account with X check digit */
  checkDigitX: '0001 0000000001-X',
  /** All nines */
  allNines: '9999 9999999999-9',
};

/** Invalid PJBank account strings */
export const invalidPjbank = {
  /** Account number too short (9 digits) */
  shortAccount: '1234 123456789-0',
  /** Agency too long (5 digits) */
  longAgency: '12345 1234567890-1',
  /** Missing space separator */
  noSpace: '12341234567890-1',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklmn-o',
};
