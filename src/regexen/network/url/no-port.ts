import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a URL without a port component
 *
 * Format: scheme://[credentials@]host[/path][?query][#fragment]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://user:pass@example.com/path'
 * @example ✅ 'http://example.com'
 * @example ❌ 'https://example.com:8080'
 */
export const noPort = _$_buildUrlRegex({
  scheme: _$_scheme.any,
  credentials: true,
  path: true,
  query: true,
  fragment: true,
});
