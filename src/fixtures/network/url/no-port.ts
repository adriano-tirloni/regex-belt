/** Valid URLs without port */
export const validNoPort = {
  /** Simple HTTPS */
  httpsSimple: 'https://example.com',
  /** With credentials and path */
  withCredsAndPath: 'https://user:pass@example.com/path',
  /** With query and fragment */
  withQueryAndFragment: 'http://example.com?q=1#frag',
  /** FTP */
  ftp: 'ftp://files.example.com/pub',
};

/** Invalid URLs (have port or missing scheme) */
export const invalidNoPort = {
  /** Has port */
  hasPort: 'https://example.com:8080',
  /** Has port with path */
  hasPortWithPath: 'https://example.com:443/path',
  /** Missing scheme */
  noScheme: 'example.com',
};
