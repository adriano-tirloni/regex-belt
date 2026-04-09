/** Valid Caixa Economica new account formats (XXXX XXXXXXXXXXXXXX-D) */
export const validCaixaEconomicaNew = {
  /** Standard account with operation 0013 */
  standard: '1234 0013123456789-0',
  /** Account with operation 0001 and X check digit */
  operation0001: '0001 0001000000001-X',
  /** All nines in account */
  allNines: '9999 9999999999999-9',
};

/** Invalid Caixa Economica new account strings */
export const invalidCaixaEconomicaNew = {
  /** Account number too short (8-digit account) */
  shortAccount: '1234 001312345678-0',
  /** Agency with check digit */
  agencyWithCheck: '1234-5 0013123456789-0',
  /** Missing space separator */
  noSpace: '12340013123456789-0',
  /** Alphabetic characters */
  alphabetic: 'abcd efghijklmnopqr-s',
};
