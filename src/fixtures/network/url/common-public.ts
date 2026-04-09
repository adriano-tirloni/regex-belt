/** Valid common public URLs */
export const validCommonPublic = {
  /** Simple HTTPS */
  httpsSimple: 'https://example.com',
  /** HTTP with path */
  httpWithPath: 'http://example.com/path',
  /** With port */
  withPort: 'https://example.com:3000',
  /** With query and fragment */
  withQueryAndFragment: 'https://example.com/search?q=test#results',
};

/** Invalid common public URLs */
export const invalidCommonPublic = {
  /** FTP scheme */
  ftp: 'ftp://files.example.com',
  /** Has credentials */
  hasCreds: 'https://user:pass@example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
