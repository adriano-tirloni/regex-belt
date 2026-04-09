/** Valid Brazilian professional registration numbers */
export const validRegistroProfissional = {
  /** CREA engineering registration */
  crea: 'CREA123456SP',
  /** CRO dental registration with space and slash */
  croWithSlash: 'CRO 12345/RJ',
  /** CRC accounting registration with dash */
  crcWithDash: 'CRC1234567890-MG',
  /** CREF physical education registration */
  cref: 'CREF12345SP',
};

/** Invalid professional registration strings */
export const invalidRegistroProfissional = {
  /** Missing CR prefix */
  noCrPrefix: 'EA123456SP',
  /** Lowercase letters */
  lowercase: 'crea123456sp',
  /** Missing state code */
  missingState: 'CREA123456',
  /** Too few digits */
  tooFewDigits: 'CREA123SP',
};
