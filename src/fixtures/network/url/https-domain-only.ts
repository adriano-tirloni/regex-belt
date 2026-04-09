/** Valid HTTPS domain-only URLs */
export const validHttpsDomainOnly = {
  /** Simple */
  simple: 'https://example.com',
  /** Subdomain */
  subdomain: 'https://sub.example.com',
  /** Deep subdomain */
  deepSubdomain: 'https://a.b.c.example.com',
};

/** Invalid HTTPS domain-only URLs */
export const invalidHttpsDomainOnly = {
  /** Has path */
  hasPath: 'https://example.com/path',
  /** Has port */
  hasPort: 'https://example.com:443',
  /** HTTP scheme */
  http: 'http://example.com',
  /** Has credentials */
  hasCreds: 'https://user@example.com',
  /** Missing scheme */
  noScheme: 'example.com',
};
