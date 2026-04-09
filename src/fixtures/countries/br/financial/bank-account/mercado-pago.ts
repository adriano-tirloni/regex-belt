/** Valid Mercado Pago account formats (XXXX XXXXXXXXXXXXX-D) */
export const validMercadoPago = {
  /** Standard account with numeric check digit */
  standard: '1234 1234567890123-4',
  /** Account with X check digit */
  checkDigitX: '0001 0000000000001-X',
  /** All nines */
  allNines: '9999 9999999999999-9',
};

/** Invalid Mercado Pago account strings */
export const invalidMercadoPago = {
  /** Account number too short (12 digits) */
  shortAccount: '1234 123456789012-4',
  /** Agency too long (5 digits) */
  longAgency: '12345 1234567890123-4',
  /** Missing space separator */
  noSpace: '12341234567890123-4',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklmnopq-r',
};
