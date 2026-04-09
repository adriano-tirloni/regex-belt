/** Valid common public domain-only URLs */
export const validCommonPublicDomainOnly = {
  /** HTTPS */
  https: 'https://example.com',
  /** HTTP */
  http: 'http://example.com',
  /** Subdomain */
  subdomain: 'https://sub.example.com',
  /** Deep subdomain */
  deepSubdomain: 'http://a.b.c.example.com',
};

/** Invalid common public domain-only URLs */
export const invalidCommonPublicDomainOnly = {
  /** Has path */
  hasPath: 'https://example.com/path',
  /** Has port */
  hasPort: 'https://example.com:443',
  /** FTP scheme */
  ftp: 'ftp://files.example.com',
  /** Has credentials */
  hasCreds: 'https://user@example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
