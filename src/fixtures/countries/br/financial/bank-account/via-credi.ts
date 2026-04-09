/** Valid ViaCredi account formats (XXXX XXXXXXXXXXX-D) */
export const validViaCredi = {
  /** Standard account with numeric check digit */
  standard: '1234 12345678901-2',
  /** Account with X check digit */
  checkDigitX: '0001 00000000001-X',
  /** All nines */
  allNines: '9999 99999999999-9',
};

/** Invalid ViaCredi account strings */
export const invalidViaCredi = {
  /** Account number too short (10 digits) */
  shortAccount: '1234 1234567890-2',
  /** Agency too long (5 digits) */
  longAgency: '12345 12345678901-2',
  /** Missing space separator */
  noSpace: '123412345678901-2',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklmno-p',
};
