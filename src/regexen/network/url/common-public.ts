import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a common public HTTP/HTTPS URL without credentials
 *
 * Format: scheme://host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com/path?q=1'
 * @example ✅ 'http://example.com:3000'
 * @example ❌ 'https://user:pass@example.com'
 * @example ❌ 'ftp://files.example.com'
 */
export const commonPublic = _$_buildUrlRegex({
  scheme: _$_scheme.httpOrHttps,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
