/** Valid Itau account formats (XXXX XXXXX-D) */
export const validItau = {
  /** Standard account with numeric check digit */
  standard: '1234 12345-6',
  /** Account with X check digit */
  checkDigitX: '0001 00001-X',
  /** All nines */
  allNines: '9999 99999-9',
};

/** Invalid Itau account strings */
export const invalidItau = {
  /** Account number too long (6 digits) */
  longAccount: '1234 123456-7',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 12345-6',
  /** Missing space separator */
  noSpace: '123412345-6',
  /** Alphabetic characters */
  alphabetic: 'abcd efghi-j',
};
