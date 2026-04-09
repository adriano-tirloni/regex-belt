/** Valid Caixa Economica account formats (XXXX XXXXXXXXXXX-D) */
export const validCaixaEconomica = {
  /** Standard account with operation 001 */
  standard: '1234 00112345678-9',
  /** Account with operation 013 */
  operation013: '0001 01300000001-0',
  /** Account with X check digit */
  checkDigitX: '5678 00199999999-X',
};

/** Invalid Caixa Economica account strings */
export const invalidCaixaEconomica = {
  /** Operation code too short (2 digits) */
  shortOperation: '1234 0012345678-9',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 00112345678-9',
  /** Missing space separator */
  noSpace: '123400112345678-9',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklmno-p',
};
