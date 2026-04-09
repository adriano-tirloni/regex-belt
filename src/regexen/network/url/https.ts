import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches an HTTPS URL with all optional components
 *
 * Format: https://[credentials@]host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com'
 * @example ✅ 'https://user:pass@example.com:443/path?q=1#frag'
 * @example ❌ 'http://example.com'
 * @example ❌ 'ftp://files.example.com'
 */
export const https = _$_buildUrlRegex({
  scheme: _$_scheme.https,
  credentials: true,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
