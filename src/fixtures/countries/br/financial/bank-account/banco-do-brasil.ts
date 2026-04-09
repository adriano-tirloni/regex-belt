/** Valid Banco do Brasil account formats (XXXX-D XXXXXXXX-D) */
export const validBancoDoBrasil = {
  /** Standard account with numeric check digits */
  standard: '1234-5 12345678-9',
  /** Account with X check digit on agency */
  agencyCheckX: '0001-X 00000001-0',
  /** Account with X check digit on account */
  accountCheckX: '9999-0 99999999-X',
};

/** Invalid Banco do Brasil account strings */
export const invalidBancoDoBrasil = {
  /** Account number too short (7 digits) */
  shortAccount: '1234-5 1234567-9',
  /** Missing space separator */
  noSpace: '1234512345678-9',
  /** Missing agency check digit */
  noAgencyCheck: '1234 12345678-9',
  /** Alphabetic characters in digits */
  alphabetic: 'abcd-e fghijklm-n',
};
