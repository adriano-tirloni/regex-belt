/** Valid Stone account formats (XXXX XXXXXXX-D) */
export const validStone = {
  /** Standard account with numeric check digit */
  standard: '1234 1234567-8',
  /** Account with X check digit */
  checkDigitX: '0001 0000001-X',
  /** All nines */
  allNines: '9999 9999999-9',
};

/** Invalid Stone account strings */
export const invalidStone = {
  /** Account number too long (8 digits) */
  longAccount: '1234 12345678-9',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 1234567-8',
  /** Missing space separator */
  noSpace: '12341234567-8',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijk-l',
};
