/** Valid Sicredi account formats (XXXX XXXXXX) */
export const validSicredi = {
  /** Standard account */
  standard: '1234 123456',
  /** Minimum values */
  minimum: '0001 000001',
  /** All nines */
  allNines: '9999 999999',
};

/** Invalid Sicredi account strings */
export const invalidSicredi = {
  /** Account number too long (7 digits) */
  longAccount: '1234 1234567',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 123456',
  /** Missing space separator */
  noSpace: '1234123456',
  /** Alphabetic characters */
  alphabetic: 'abcd efghij',
};
