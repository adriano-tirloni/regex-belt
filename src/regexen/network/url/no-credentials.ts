import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a URL without credentials
 *
 * Format: scheme://host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com:8080/path?q=1'
 * @example ✅ 'http://example.com'
 * @example ❌ 'https://user:pass@example.com'
 */
export const noCredentials = _$_buildUrlRegex({
  scheme: _$_scheme.any,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
