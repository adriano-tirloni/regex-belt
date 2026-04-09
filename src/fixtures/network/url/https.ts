/** Valid HTTPS URLs */
export const validHttps = {
  /** Simple */
  simple: 'https://example.com',
  /** All components */
  allComponents: 'https://user:pass@example.com:443/path?q=1#frag',
  /** With path */
  withPath: 'https://example.com/path/to/page',
  /** Subdomain */
  subdomain: 'https://api.example.com',
};

/** Invalid HTTPS URLs */
export const invalidHttps = {
  /** HTTP scheme */
  http: 'http://example.com',
  /** FTP scheme */
  ftp: 'ftp://files.example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
