import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a full URL with all optional components
 *
 * Format: scheme://[credentials@]host[:port][/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://user:pass@example.com:8080/path?q=1#frag'
 * @example ✅ 'http://example.com'
 * @example ✅ 'ftp://files.example.com/pub'
 * @example ❌ 'example.com'
 * @example ❌ '//example.com'
 */
export const full = _$_buildUrlRegex({
  scheme: _$_scheme.any,
  credentials: true,
  port: true,
  path: true,
  query: true,
  fragment: true,
});
