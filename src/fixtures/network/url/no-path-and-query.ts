/** Valid URLs without path or query */
export const validNoPathAndQuery = {
  /** Simple HTTPS */
  httpsSimple: 'https://example.com',
  /** With credentials and port */
  withCredsAndPort: 'https://user:pass@example.com:8080',
  /** With port */
  withPort: 'http://example.com:3000',
  /** FTP */
  ftp: 'ftp://files.example.com',
};

/** Invalid URLs (have path or query) */
export const invalidNoPathAndQuery = {
  /** Has path */
  hasPath: 'https://example.com/path',
  /** Has query */
  hasQuery: 'https://example.com?q=1',
  /** Has fragment */
  hasFragment: 'https://example.com#top',
  /** Missing scheme */
  noScheme: 'example.com',
};
