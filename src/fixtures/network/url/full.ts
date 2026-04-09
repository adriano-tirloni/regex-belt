/** Valid full URLs */
export const validFull = {
  /** HTTPS with all components */
  httpsAll: 'https://user:pass@example.com:8080/path/to/page?q=1&r=2#section',
  /** Simple HTTPS */
  httpsSimple: 'https://example.com',
  /** HTTP with path */
  httpWithPath: 'http://example.com/path',
  /** FTP with credentials */
  ftpWithCreds: 'ftp://user:pass@files.example.com/pub',
  /** Subdomain chain */
  subdomains: 'https://a.b.c.example.com',
  /** With port only */
  portOnly: 'http://example.com:3000',
  /** With query only */
  queryOnly: 'https://example.com?search=test',
  /** With fragment only */
  fragmentOnly: 'https://example.com#top',
};

/** Invalid full URLs */
export const invalidFull = {
  /** Missing scheme */
  noScheme: 'example.com',
  /** Protocol-relative */
  protocolRelative: '//example.com',
  /** Bare domain */
  bareDomain: 'example',
  /** Empty */
  empty: '',
  /** File scheme (unsupported) */
  fileScheme: 'file:///path/to/file',
};
