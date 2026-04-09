/** Valid FTP URLs */
export const validFtp = {
  /** Simple */
  simple: 'ftp://files.example.com',
  /** With credentials */
  withCreds: 'ftp://user:pass@ftp.example.com:21/pub',
  /** With path */
  withPath: 'ftp://ftp.example.com/pub/files',
};

/** Invalid FTP URLs */
export const invalidFtp = {
  /** HTTPS scheme */
  https: 'https://example.com',
  /** HTTP scheme */
  http: 'http://example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
