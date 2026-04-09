/** Valid URLs without credentials */
export const validNoCredentials = {
  /** Simple HTTPS */
  httpsSimple: 'https://example.com',
  /** With port and path */
  withPortAndPath: 'https://example.com:8080/path',
  /** With query */
  withQuery: 'http://example.com?q=1',
  /** FTP with path */
  ftpWithPath: 'ftp://files.example.com/pub',
};

/** Invalid URLs (have credentials or missing scheme) */
export const invalidNoCredentials = {
  /** Has credentials */
  hasCreds: 'https://user:pass@example.com',
  /** Has user-only credentials */
  hasUserCreds: 'https://user@example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
