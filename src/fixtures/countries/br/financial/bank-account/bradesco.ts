/** Valid Bradesco account formats (XXXX-D XXXXXXX-D) */
export const validBradesco = {
  /** Standard account with numeric check digits */
  standard: '1234-5 1234567-8',
  /** Account with X check digit on agency */
  agencyCheckX: '0001-X 0000001-0',
  /** Account with X check digit on account */
  accountCheckX: '9999-0 9999999-X',
};

/** Invalid Bradesco account strings */
export const invalidBradesco = {
  /** Account number too long (8 digits) */
  longAccount: '1234-5 12345678-9',
  /** Agency too long (5 digits) */
  longAgency: '12345 1234567-8',
  /** Missing space separator */
  noSpace: '1234-51234567-8',
  /** Alphabetic characters */
  alphabetic: 'abcd-e fghijkl-m',
};
