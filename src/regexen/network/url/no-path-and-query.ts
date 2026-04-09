import { _$_buildUrlRegex, _$_scheme } from './_helpers.ts';

/**
 * Matches a URL without path, query, or fragment components
 *
 * Format: scheme://[credentials@]host[:port]
 *
 * ___Enforces beginning and end of string___
 * @example ✅ 'https://example.com'
 * @example ✅ 'https://user:pass@example.com:8080'
 * @example ❌ 'https://example.com/path'
 * @example ❌ 'https://example.com?q=1'
 */
export const noPathAndQuery = _$_buildUrlRegex({
  scheme: _$_scheme.any,
  credentials: true,
  port: true,
});
