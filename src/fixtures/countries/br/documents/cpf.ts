/** Valid formatted CPF numbers (XXX.XXX.XXX-XX) */
export const validCpf = {
  /** Typical CPF number */
  standard: '123.456.789-09',
  /** All zeros — structurally valid format */
  allZeros: '000.000.000-00',
  /** All nines — maximum digit values */
  allNines: '999.999.999-99',
};

/** Invalid CPF strings */
export const invalidCpf = {
  /** Digits only, no formatting */
  unformatted: '12345678909',
  /** Missing last check digit */
  tooShort: '123.456.789-0',
  /** Extra check digit */
  tooLong: '123.456.789-099',
  /** Hyphens instead of dots as group separators */
  wrongSeparator: '123-456-789-09',
  /** Missing the final hyphen separator */
  missingHyphen: '123.456.78909',
  /** Alphabetic characters instead of digits */
  alphabetic: 'abc.def.ghi-jk',
};
