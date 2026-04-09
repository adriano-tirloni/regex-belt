import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches an HTTP URL with all optional components
 *
 * Format: http://[credentials@]host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'http://example.com'
 * @example ✅ 'http://user:pass@example.com:8080/path'
 * @example ❌ 'https://example.com'
 * @example ❌ 'ftp://files.example.com'
 */
export const http = _$_buildUrlRegex({
  scheme: _$_scheme.http,
  credentials: true,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
