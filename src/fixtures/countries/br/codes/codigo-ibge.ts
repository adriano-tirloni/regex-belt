/** Valid IBGE municipality codes (7 digits) */
export const validCodigoIbge = {
  /** Sao Paulo */
  saoPaulo: '3550308',
  /** Porto Velho */
  portoVelho: '1100015',
  /** Brasilia */
  brasilia: '5300108',
};

/** Invalid IBGE code strings */
export const invalidCodigoIbge = {
  /** Too few digits */
  tooShort: '355030',
  /** Too many digits */
  tooLong: '35503080',
  /** Alphabetic characters */
  alphabetic: 'abcdefg',
  /** Digits with dot separators */
  withDots: '355.030.8',
};
