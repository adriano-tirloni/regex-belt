/** Valid BS2 account formats (XXXX XXXXXX-D) */
export const validBs2 = {
  /** Standard account with numeric check digit */
  standard: '1234 123456-7',
  /** Account with X check digit */
  checkDigitX: '0001 000001-X',
  /** All nines */
  allNines: '9999 999999-9',
};

/** Invalid BS2 account strings */
export const invalidBs2 = {
  /** Account number too long (7 digits) */
  longAccount: '1234 1234567-8',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 123456-7',
  /** Missing space separator */
  noSpace: '1234123456-7',
  /** Alphabetic characters */
  alphabetic: 'abcd efghij-k',
};
